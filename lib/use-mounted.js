"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * False during SSR and the first client render, true after hydration.
 * Used to defer motion-value-driven markup: springs calculate slightly
 * different numbers on the server and client, which breaks hydration.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
