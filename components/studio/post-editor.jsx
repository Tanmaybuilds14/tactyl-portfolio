import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { previewAction, savePostAction } from "@/app/studio/actions";

export function PostEditor({ post, error }) {
  return (
    <form action={savePostAction} className="flex flex-col gap-6">
      <input type="hidden" name="id" value={post.id || ""} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/studio"
          className="font-label inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          All posts
        </Link>
        <div className="flex flex-wrap gap-2">
          {post.slug && (
            <Button
              type="submit"
              formAction={previewAction}
              name="slug"
              value={post.slug}
              variant="outline"
              className="rounded-full"
            >
              Preview draft
            </Button>
          )}
          <Button type="submit" className="rounded-full">
            {post.id ? "Save changes" : "Create post"}
          </Button>
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-[1.4fr_0.6fr]">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title" className="font-label text-muted-foreground">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={post.title}
            className="h-11 bg-card text-base"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="slug" className="font-label text-muted-foreground">
            Slug
          </Label>
          <Input
            id="slug"
            name="slug"
            defaultValue={post.slug}
            placeholder="generated from the title"
            className="h-11 bg-card font-mono text-xs"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="excerpt" className="font-label text-muted-foreground">
          Excerpt
        </Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post.excerpt}
          className="bg-card"
          placeholder="One or two sentences used on cards and in search results."
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="categoryName" className="font-label text-muted-foreground">
            Category
          </Label>
          <Input
            id="categoryName"
            name="categoryName"
            defaultValue={post.category?.name || "Notes"}
            className="h-10 bg-card"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tags" className="font-label text-muted-foreground">
            Tags (comma separated)
          </Label>
          <Input
            id="tags"
            name="tags"
            defaultValue={(post.tags || []).join(", ")}
            className="h-10 bg-card"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="status" className="font-label text-muted-foreground">
            Status
          </Label>
          <select
            id="status"
            name="status"
            defaultValue={post.status || "draft"}
            className="h-10 w-full rounded-lg border border-input bg-card px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={Boolean(post.featured)}
          className="size-3.5 accent-foreground"
        />
        Feature this post
      </label>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="body" className="font-label text-muted-foreground">
          Body (Markdown)
        </Label>
        <Textarea
          id="body"
          name="body"
          required
          rows={22}
          defaultValue={post.body}
          className="bg-card font-mono text-[0.8rem] leading-relaxed"
          placeholder={"## A heading\n\nA paragraph with **bold** and a [link](/program).\n\n- A list item\n- Another item"}
        />
        <p className="text-xs text-muted-foreground">
          Supports headings (##), bold, italic, links, lists, quotes, code and images-free
          paragraphs. HTML is escaped before rendering.
        </p>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-5">
        <Button type="submit" className="rounded-full">
          {post.id ? "Save changes" : "Create post"}
        </Button>
        <Button variant="ghost" render={<Link href="/studio" />} className="rounded-full">
          Cancel
        </Button>
      </div>
    </form>
  );
}
