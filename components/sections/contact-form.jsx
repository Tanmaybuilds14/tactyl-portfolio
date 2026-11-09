"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const roles = [
  { value: "parent", label: "I am a parent" },
  { value: "student", label: "I am a student" },
  { value: "educator", label: "I am an educator" },
  { value: "other", label: "Something else" },
];

const initial = {
  name: "",
  email: "",
  phone: "",
  role: "parent",
  studentAge: "",
  message: "",
  consent: false,
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState({ status: "idle", message: "" });

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setState({ status: "loading", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setState({
          status: "error",
          message: data.error || "We could not send that. Please email us instead.",
        });
        return;
      }

      setState({ status: "success", message: data.message });
      setForm(initial);
    } catch {
      setState({
        status: "error",
        message: "Network error. Please email us directly and we will reply.",
      });
    }
  }

  if (state.status === "success") {
    return (
      <Alert className="h-fit bg-card p-6">
        <AlertTitle className="text-base">Request received</AlertTitle>
        <AlertDescription className="mt-2">
          {state.message}
          <div className="mt-4">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setState({ status: "idle", message: "" })}
            >
              Send another
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name" className="font-label text-muted-foreground">
            Your name
          </Label>
          <Input
            id="name"
            name="name"
            required
            minLength={2}
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Parent or student name"
            className="h-10 bg-background/60"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="font-label text-muted-foreground">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@example.com"
            className="h-10 bg-background/60"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone" className="font-label text-muted-foreground">
            Phone (optional)
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="+91"
            className="h-10 bg-background/60"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="role" className="font-label text-muted-foreground">
            I am a
          </Label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={(event) => update("role", event.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-background/60 px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="studentAge" className="font-label text-muted-foreground">
            Student age (optional)
          </Label>
          <Input
            id="studentAge"
            name="studentAge"
            type="number"
            min={8}
            max={25}
            value={form.studentAge}
            onChange={(event) => update("studentAge", event.target.value)}
            placeholder="14"
            className="h-10 bg-background/60"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message" className="font-label text-muted-foreground">
          What do they want to build?
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="One problem, one idea, or just a question about the programme."
          className="bg-background/60"
        />
      </div>

      {/* Honeypot — hidden from people, filled by bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(event) => update("consent", event.target.checked)}
          className="mt-0.5 size-3.5 accent-foreground"
          required
        />
        <span>
          I agree to the{" "}
          <a href="/privacy" className="underline underline-offset-2">
            privacy note
          </a>{" "}
          and to being contacted about the programme.
        </span>
      </label>

      {state.status === "error" && (
        <p role="alert" className="text-xs text-destructive">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          disabled={state.status === "loading"}
          className="h-11 rounded-full px-6"
        >
          {state.status === "loading" ? (
            <>
              <Loader2 className="animate-spin" data-icon="inline-start" />
              Sending
            </>
          ) : (
            <>
              Request a consultation
              <Send data-icon="inline-end" />
            </>
          )}
        </Button>
        <span className="text-xs text-muted-foreground">Replies within one working day.</span>
      </div>
    </form>
  );
}
