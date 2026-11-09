import { site } from "./site";

/**
 * Notify the team about a new lead.
 *
 * Sends through Resend when RESEND_API_KEY and LEADS_INBOX are set; otherwise
 * logs a single safe line so the lead is still visible in the server logs.
 * No key is required to develop.
 */
export async function notifyTeam({ subject, lines }) {
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.LEADS_INBOX;

  if (!apiKey || !inbox) {
    console.info(`[lead] ${subject}`, { at: new Date().toISOString() });
    return { sent: false };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.LEADS_FROM || `Tactyqal Labs <leads@${new URL(site.url).hostname}>`,
        to: [inbox],
        subject,
        text: lines.join("\n"),
      }),
    });
    return { sent: response.ok };
  } catch (error) {
    console.error("[lead] email failed", error?.message);
    return { sent: false };
  }
}
