"use client";

import { useEffect, useState } from "react";

/**
 * Hydration-safe `prefers-reduced-motion`.
 *
 * Motion's own `useReducedMotion` resolves on the client, so branching on it
 * during SSR renders different markup on the server and the client. This version
 * starts from the animated markup (false) and switches after mount, which keeps
 * hydration identical and still respects the user's setting immediately after.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return reduced;
}
