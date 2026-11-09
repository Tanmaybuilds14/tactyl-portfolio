import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

async function exitPreview() {
  "use server";
  const draft = await draftMode();
  draft.disable();
  redirect("/blog");
}

export async function PreviewBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (
    <aside
      role="status"
      className="sticky top-16 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary px-5 py-2.5 text-sm sm:px-8"
    >
      <p className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-foreground" />
        Preview mode — you may be seeing an unpublished draft.
      </p>
      <form action={exitPreview}>
        <button
          type="submit"
          className="font-label underline underline-offset-4 hover:text-foreground"
        >
          Exit preview
        </button>
      </form>
    </aside>
  );
}
