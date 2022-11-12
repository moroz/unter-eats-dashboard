import { useMemo } from "react";
import { useLocation } from "react-router-dom";

/*
 * Returns current location as pathname + query string. Used to pass as
 * `referrer` to some links so we can always go back to the same URL without
 * calling History APIs.
 */
const useReferrer = () => {
  const location = useLocation();
  return useMemo(() => {
    const referrer = location.pathname + location.search;
    const referrerQuery = new URLSearchParams({ ref: referrer }).toString();

    return {
      referrer,
      referrerQuery
    };
  }, [location]);
};

export default useReferrer;
