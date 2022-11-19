import useAuth from "@hooks/useAuth";
import { useEffect, useRef } from "react";
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
  const { user } = useAuth();

  const socketRef = useRef<PhoenixSocket | null>(null);
  const linkRef = useRef<any>(null);
  const clientRef = useRef<any>(null);

  useEffect(() => {
    if (!user) return;

    const token = user?.subscriptionToken;
    socketRef.current = new PhoenixSocket(resolveSocketURL(), {
      params: { token }
    });
    socketRef.current?.connect();
    linkRef.current = createAbsintheSocketLink(
      AbsintheSocket.create(socketRef.current)
    );

    clientRef.current = new ApolloClient({
      cache: new InMemoryCache(),
      link: linkRef.current
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user]);

  if (!user) return null;

  return clientRef.current;
};
