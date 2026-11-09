"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ToolLeadForm({ toolName, toolSlug }) {
  const [state, setState] = useState({ status: "idle", message: "" });
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setState({ status: "loading", message: "" });
    try {
      const response = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tool: toolSlug, consent, website: "" }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setState({ status: "error", message: data.error || "Could not send the link." });
        return;
      }
      setState({ status: "success", message: data.message });
      setEmail("");
      setConsent(false);
    } catch {
      setState({ status: "error", message: "Network error. Please try again." });
    }
  }

  if (state.status === "success") {
    return (
      <div className="mt-5 rounded-xl border border-border bg-secondary/40 p-4 text-sm leading-relaxed">
        {state.message}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="tool-email" className="font-label text-muted-foreground">
          Email
        </Label>
        <Input
          id="tool-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="h-10 bg-background/60"
        />
      </div>

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-0.5 size-3.5 accent-foreground"
          required
        />
        <span>
          I agree to the <a href="/privacy" className="underline underline-offset-2">privacy note</a>{" "}
          and to being contacted about the {toolName} result.
        </span>
      </label>

      {state.status === "error" && (
        <p role="alert" className="text-xs text-destructive">
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={state.status === "loading"} className="h-10 rounded-full">
        {state.status === "loading" ? (
          <>
            <Loader2 className="animate-spin" data-icon="inline-start" />
            Sending
          </>
        ) : (
          "Email me the assessment"
        )}
      </Button>
    </form>
  );
}
