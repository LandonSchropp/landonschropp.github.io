"use client";

import { useState, useEffect } from "react";

type ClientOnlyProps = {
  /** The children to render only on the client. */
  children: React.ReactNode;
};

/**
 * This component only renders its children on the client.
 */
export const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return isClient ? <>{children}</> : null;
};
