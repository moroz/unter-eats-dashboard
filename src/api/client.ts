import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { getMainDefinition } from "@apollo/client/utilities";
import { split, HttpLink } from "@apollo/client";
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";

export const VITE_GRAPHQL_URL =
  import.meta.env.VITE_GRAPHQL_URL ?? "http://localhost:4000/api";

export const API_BASE_URL = new URL(VITE_GRAPHQL_URL).origin;

const httpLink = new HttpLink({
  uri: VITE_GRAPHQL_URL,
  credentials: "include"
});

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

const socket = new PhoenixSocket(resolveSocketURL());

const wsLink = createAbsintheSocketLink(AbsintheSocket.create(socket));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink as any,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});

export default client;
