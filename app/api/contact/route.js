import { headers } from "next/headers";

import { contactSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { saveLead } from "@/lib/leads";
import { notifyTeam } from "@/lib/notify";

export async function POST(request) {
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "local";

  const limit = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limit.ok) {
    return Response.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: answer like a success so bots do not learn anything.
  if (typeof payload?.website === "string" && payload.website.trim()) {
    return Response.json({ ok: true, message: "Thanks — we will be in touch." });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const first =
      Object.values(fieldErrors).flat().filter(Boolean)[0] ||
      "Please check the form and try again.";
    return Response.json({ error: first, fields: fieldErrors }, { status: 422 });
  }

  const lead = parsed.data;

  await saveLead({
    type: "contact",
    name: lead.name,
    email: lead.email,
    phone: lead.phone || "",
    role: lead.role,
    studentAge: lead.studentAge || null,
    message: lead.message,
    consent: lead.consent,
    source: "/contact",
    ip,
  });

  await notifyTeam({
    subject: `New consultation request — ${lead.name}`,
    lines: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone || "not given"}`,
      `Role: ${lead.role}`,
      `Student age: ${lead.studentAge || "not given"}`,
      "",
      lead.message,
    ],
  });

  return Response.json({
    ok: true,
    message:
      "Thanks — a mentor will reply within one working day. If it is urgent, email us directly.",
  });
}
