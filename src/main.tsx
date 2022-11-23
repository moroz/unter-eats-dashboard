import ReactDOM from "react-dom/client";
import client from "./api/client";
import { ApolloProvider } from "@apollo/client";
import "./css/app.scss";
import { BrowserRouter } from "react-router-dom";
import Router from "@views/Router";
import { FlashProvider } from "@views/Layout/FlashProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <FlashProvider>
        <Router />
      </FlashProvider>
    </BrowserRouter>
  </ApolloProvider>
);
