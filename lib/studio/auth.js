import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Studio authentication.
 *
 * One editor password (env STUDIO_PASSWORD) sets a signed, http-only cookie scoped
 * to /studio. There are no user accounts because the plan has one or two editors;
 * swap this for the CMS login when WordPress takes over.
 */
const COOKIE = "studio_session";
const MAX_AGE = 60 * 60 * 8;

function secret() {
  return process.env.STUDIO_PASSWORD || "tactyqal-studio-dev";
}

function token() {
  return createHmac("sha256", secret()).update("tactyqal-studio").digest("hex");
}

function safeEqual(a = "", b = "") {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

export async function isStudioAuthed() {
  const store = await cookies();
  const value = store.get(COOKIE)?.value;
  if (!value) return false;
  return safeEqual(value, token());
}

export async function requireStudio() {
  if (!(await isStudioAuthed())) redirect("/studio/login");
}

export async function signIn(password) {
  const expected = secret();
  if (!safeEqual(password || "", expected)) return false;
  const store = await cookies();
  store.set(COOKIE, token(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/studio",
    maxAge: MAX_AGE,
  });
  return true;
}

export async function signOut() {
  const store = await cookies();
  store.delete(COOKIE);
}
