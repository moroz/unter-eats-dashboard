import { useContext } from "react";
import { SubscriptionClientContext } from "./provider";

export const useSubscriptionClientContext = () =>
  useContext(SubscriptionClientContext)!;
