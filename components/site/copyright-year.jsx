import { cacheLife } from "next/cache";

/**
 * The copyright year is a cached value: `new Date()` inside a `use cache` scope
 * is allowed during prerendering (a bare call is not).
 */
export async function CopyrightYear() {
  "use cache";
  cacheLife("max");

  return <>{new Date().getFullYear()}</>;
}
