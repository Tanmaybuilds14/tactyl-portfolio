"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "../actions";

export default function StudioLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-5 py-24">
      <div>
        <span className="grid size-10 place-items-center rounded-full border border-foreground/20">
          <Lock className="size-4" />
        </span>
        <h1 className="mt-5 text-2xl font-medium tracking-tight">Blog studio</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Editors only. The password is set with <code className="font-mono text-xs">STUDIO_PASSWORD</code>.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password" className="font-label text-muted-foreground">
            Editor password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="h-10 bg-card"
          />
        </div>

        {state?.error && (
          <Alert variant="destructive" className="py-2">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={pending} className="h-10 rounded-full">
          {pending ? (
            <>
              <Loader2 className="animate-spin" data-icon="inline-start" />
              Checking
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </div>
  );
}
