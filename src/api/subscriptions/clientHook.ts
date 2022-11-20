import useAuth from "@hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { VITE_GRAPHQL_URL } from "../client";
import { Socket as PhoenixSocket } from "phoenix";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import * as AbsintheSocket from "@absinthe/socket";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const resolveSocketURL = () => {
  const parsed = new URL(VITE_GRAPHQL_URL);
  if (parsed.protocol === "https") {
    parsed.protocol = "wss";
  } else {
    parsed.protocol = "ws";
  }
  parsed.pathname = "/api/ws";
  return parsed.toString();
};

export const useSubscriptionClient = () => {
  const { user, loading } = useAuth();
  const [connected, setConnected] = useState(false);

  const socketRef = useRef<PhoenixSocket | null>(
    new PhoenixSocket(resolveSocketURL())
  );
  const linkRef = useRef<any>(null);
  const clientRef = useRef<any>(null);

  useEffect(() => {
    if (!user || connected) return;

    const token = user?.subscriptionToken;
    socketRef.current?.onOpen(() => {
      setConnected(true);
    });
    socketRef.current?.connect({ token });

    linkRef.current = createAbsintheSocketLink(
      AbsintheSocket.create(socketRef.current!)
    );

    clientRef.current = new ApolloClient({
      cache: new InMemoryCache(),
      link: linkRef.current
    });
  }, [user, loading, clientRef.current]);

  return {
    connected,
    client: clientRef.current
  };
};
