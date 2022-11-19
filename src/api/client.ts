import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "@apollo/client";

export const VITE_GRAPHQL_URL =
  import.meta.env.VITE_GRAPHQL_URL ?? "http://localhost:4000/api";

export const API_BASE_URL = new URL(VITE_GRAPHQL_URL).origin;

const httpLink = new HttpLink({
  uri: VITE_GRAPHQL_URL,
  credentials: "include"
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
});

export default client;
