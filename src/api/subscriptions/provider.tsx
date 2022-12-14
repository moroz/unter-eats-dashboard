import React from "react";
import { useSubscriptionClient } from "./clientHook";

interface Props {
  children: React.ReactNode;
}

export const SubscriptionClientContext = React.createContext<any>(null);

const SubscriptionProvider: React.FC<Props> = ({ children }) => {
  const { client, connected } = useSubscriptionClient();

  if (!connected) return null;

  return (
    <SubscriptionClientContext.Provider value={client}>
      {children}
    </SubscriptionClientContext.Provider>
  );
};

export default SubscriptionProvider;
