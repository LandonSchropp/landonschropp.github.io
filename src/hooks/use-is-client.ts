import { useEffect, useState } from "react";

/**
 * Returns true if the code is running on the client.
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(typeof window !== "undefined"), []);
  return isClient;
}
