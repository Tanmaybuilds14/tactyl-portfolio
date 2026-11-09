import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { slugify } from "./markdown";

/**
 * File-backed blog store.
 *
 * This is the working backend for the blog until the WordPress install is moved
 * to cms.tactyqal.com: posts live in one JSON file, writes are serialised through
 * a promise queue, and the public read path goes through `lib/blog/queries.js`
 * where it is cached and tagged. Set WP_API_URL to switch reads to WordPress
 * without changing any page code.
 */
const DATA_FILE = process.env.BLOG_DATA_FILE
  ? path.resolve(process.cwd(), process.env.BLOG_DATA_FILE)
  : path.join(process.cwd(), "data", "blog.json");

const seedPosts = [
  {
    id: "post_cut_two_thirds",
    slug: "why-we-cut-two-thirds-of-every-idea",
    title: "Why we cut two-thirds of every student's idea in week one",
    excerpt:
      "Scope is the difference between a launched product and an abandoned folder. Here is the cut we make with every student, and why it works.",
    status: "published",
    category: { slug: "method", name: "Method" },
    tags: ["scope", "programme"],
    author: { name: "Tactyqal Labs", initials: "TL" },
    publishedAt: "2025-07-09T09:00:00.000Z",
    updatedAt: "2025-07-09T09:00:00.000Z",
    featured: true,
    cover: "tunnel",
    body: `Every cohort starts the same way: a student describes an app with nine features, a marketplace, a chat system and a subscription tier. It is ambitious, it is coherent, and it cannot be built by one person in eight weeks.

## The cut is the lesson

We do not tell students their idea is bad. We ask a narrower question: **which single user, on which single afternoon, gets value from this?**

That question usually removes two-thirds of the feature list. What remains is a product that can be built, tested with real people and launched inside the programme.

> If a feature cannot be explained in one sentence to the person who will use it, it is not ready to be built.

## What survives the cut

Three things tend to survive:

1. The core action — the thing the user came to do.
2. The evidence that it worked — a confirmation, a result, a saved record.
3. The way the student finds out it failed — feedback from a real user.

Everything else is a phase-two feature. Not deleted, just written down and moved out of the build window.

## Why parents worry

Cutting scope can look like lowering ambition. The opposite is true. A student who launches a small product learns deployment, feedback, iteration and public speaking. A student who abandons a large one learns that they ran out of time.

The ambition is not in the feature list. It is in finishing something that someone else uses.`,
  },
  {
    id: "post_launch_week",
    slug: "what-launch-week-actually-teaches",
    title: "What launch week actually teaches (and coursework cannot)",
    excerpt:
      "The first ten users are uncomfortable, unglamorous and the most educational part of the whole eight weeks.",
    status: "published",
    category: { slug: "stories", name: "Stories" },
    tags: ["launch", "feedback"],
    author: { name: "Tactyqal Labs", initials: "TL" },
    publishedAt: "2025-06-02T09:00:00.000Z",
    updatedAt: "2025-06-02T09:00:00.000Z",
    featured: false,
    cover: "grid",
    body: `Launch week is where the programme stops being a class. Until then, the only person who has used the app is the student who built it — and they know where every button is.

## The first ten users

We ask for ten real users. Not classmates, not parents. People who have the problem the app claims to solve.

The first three usually go badly. A form does not submit, a label is confusing, the empty state is a dead end. This is not failure; it is the first honest measurement of the work.

## Feedback is a skill

Students practise asking a specific question — "what did you expect to happen when you tapped that?" — instead of "do you like it?". The second question produces politeness. The first produces a bug list.

## Demo day

At the end of week eight, students present to family, mentors and peers. The brief is two minutes: the problem, the product, the first result. No slides full of features.

The room is usually surprised by how plainly the students talk about what did not work. That is the habit we are trying to build — the ability to describe your own work accurately, in public, without exaggerating.`,
  },
  {
    id: "post_no_code_first",
    slug: "no-code-first-when-code-comes-later",
    title: "No-code first: when we add code, and why not sooner",
    excerpt:
      "Students ship before they learn syntax. That order is deliberate — here is where it helps and where it stops working.",
    status: "published",
    category: { slug: "method", name: "Method" },
    tags: ["no-code", "curriculum"],
    author: { name: "Tactyqal Labs", initials: "TL" },
    publishedAt: "2025-04-18T09:00:00.000Z",
    updatedAt: "2025-04-18T09:00:00.000Z",
    featured: false,
    cover: "rings",
    body: `There is a version of this programme where week one starts with a code editor. It produces students who can write a loop and have never shipped anything.

## Ship, then understand

No-code tools let a student put a real product in front of a real user in days. That first launch changes the questions they ask. Instead of "what does this function do?", they ask "why do users drop off here?"

Those are better questions, and they arrive earlier.

## When code is the right answer

We introduce code when a tool hits a wall that blocks the product:

- A data shape the no-code platform cannot represent
- A calculation the interface cannot express
- A performance or cost limit that affects real users

At that point the student has a reason to learn, a working product to modify, and a way to check whether the change helped.

## The trade-off

No-code has a ceiling. Students who want to work on systems software, games or performance-critical products will outgrow it. We say so in the first session rather than in week eight.

For everyone else, the sequence holds: build the product, find the wall, learn what the wall is made of.`,
  },
];

let queue = Promise.resolve();

async function readAll() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.posts)) throw new Error("Invalid blog store");
    return parsed;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    const initial = { posts: seedPosts, version: 1 };
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  }
}

async function writeAll(data) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  const tmp = `${DATA_FILE}.${randomUUID()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, DATA_FILE);
}

/** Serialise every mutation so concurrent saves cannot clobber each other. */
function withLock(fn) {
  const run = queue.then(fn, fn);
  queue = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

export function readingMinutes(body = "") {
  const words = String(body).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function normalise(post) {
  return {
    ...post,
    readingMinutes: readingMinutes(post.body),
    wordCount: String(post.body || "").trim().split(/\s+/).filter(Boolean).length,
  };
}

export async function readPostsRaw() {
  const data = await readAll();
  return data.posts.map(normalise);
}

export async function readPostRaw(slug) {
  const posts = await readPostsRaw();
  return posts.find((post) => post.slug === slug) || null;
}

export async function createPost(input) {
  return withLock(async () => {
    const data = await readAll();
    const now = new Date().toISOString();
    const baseSlug = slugify(input.slug || input.title);
    let slug = baseSlug || `post-${Date.now()}`;
    let n = 2;
    while (data.posts.some((post) => post.slug === slug)) {
      slug = `${baseSlug}-${n++}`;
    }

    const post = {
      id: `post_${randomUUID().slice(0, 8)}`,
      slug,
      title: input.title,
      excerpt: input.excerpt || "",
      body: input.body || "",
      status: input.status === "published" ? "published" : "draft",
      category: input.category || { slug: "notes", name: "Notes" },
      tags: input.tags || [],
      author: input.author || { name: "Tactyqal Labs", initials: "TL" },
      featured: Boolean(input.featured),
      cover: input.cover || "grid",
      publishedAt:
        input.status === "published" ? input.publishedAt || now : input.publishedAt || null,
      updatedAt: now,
    };

    data.posts.unshift(post);
    await writeAll(data);
    return normalise(post);
  });
}

export async function updatePost(id, input) {
  return withLock(async () => {
    const data = await readAll();
    const index = data.posts.findIndex((post) => post.id === id);
    if (index === -1) return null;

    const current = data.posts[index];
    const next = { ...current, ...input, updatedAt: new Date().toISOString() };

    if (input.title && !input.slug) next.slug = current.slug;
    if (input.slug && input.slug !== current.slug) {
      let slug = slugify(input.slug);
      let n = 2;
      while (data.posts.some((post) => post.slug === slug && post.id !== id)) {
        slug = `${slugify(input.slug)}-${n++}`;
      }
      next.slug = slug;
    }
    if (input.status === "published" && !next.publishedAt) {
      next.publishedAt = new Date().toISOString();
    }

    data.posts[index] = next;
    await writeAll(data);
    return normalise(next);
  });
}

export async function deletePost(id) {
  return withLock(async () => {
    const data = await readAll();
    const before = data.posts.length;
    data.posts = data.posts.filter((post) => post.id !== id);
    if (data.posts.length === before) return false;
    await writeAll(data);
    return true;
  });
}
