import { AnyDate } from "@api/interfaces";
import dayjs from "dayjs";

export function today() {
  return dayjs().format("YYYY-MM-DD");
}

export function compactTime(timestamp: AnyDate) {
  const normalized = dayjs(timestamp);
  if (normalized.isAfter(dayjs().startOf("day"))) {
    return normalized.format("HH:mm");
  }
  return normalized.format("YYYY-MM-DD HH:mm");
}
