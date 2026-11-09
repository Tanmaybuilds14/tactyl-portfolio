import { headers } from "next/headers";

import { toolLeadSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { saveLead } from "@/lib/leads";
import { notifyTeam } from "@/lib/notify";
import { getTool } from "@/lib/content/tools";

export async function POST(request) {
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "local";

  const limit = rateLimit(`tools:${ip}`, 8, 60_000);
  if (!limit.ok) {
    return Response.json(
      { error: "Too many requests. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof payload?.website === "string" && payload.website.trim()) {
    return Response.json({ ok: true, message: "Check your inbox for the link." });
  }

  const parsed = toolLeadSchema.safeParse(payload);
  if (!parsed.success) {
    const first =
      Object.values(parsed.error.flatten().fieldErrors).flat().filter(Boolean)[0] ||
      "Please check the email address.";
    return Response.json({ error: first }, { status: 422 });
  }

  const tool = getTool(parsed.data.tool);
  if (!tool) {
    return Response.json({ error: "Unknown assessment." }, { status: 404 });
  }

  await saveLead({
    type: "tool",
    email: parsed.data.email,
    tool: tool.slug,
    toolName: tool.name,
    consent: parsed.data.consent,
    source: `/tools/${tool.slug}`,
    ip,
  });

  await notifyTeam({
    subject: `Tool request — ${tool.name}`,
    lines: [`Email: ${parsed.data.email}`, `Assessment: ${tool.name}`],
  });

  return Response.json({
    ok: true,
    message: `Thanks — the ${tool.name} link is on its way to your inbox.`,
  });
}
