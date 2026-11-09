import { z } from "zod";

const phone = z
  .string()
  .trim()
  .max(24)
  .regex(/^[+0-9()\-\s]*$/, "Enter a valid phone number")
  .optional()
  .or(z.literal(""));

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(80),
  email: z.email("Enter a valid email address"),
  phone,
  role: z.enum(["parent", "student", "educator", "other"]).default("parent"),
  studentAge: z.coerce.number().int().min(8).max(25).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two helps us prepare")
    .max(2000, "Please keep it under 2000 characters"),
  consent: z.literal(true, { message: "Please accept the privacy note" }),
  // Honeypot: real users never fill this in.
  website: z.string().max(0).optional(),
});

export const toolLeadSchema = z.object({
  email: z.email("Enter a valid email address"),
  tool: z.string().trim().min(2).max(80),
  consent: z.literal(true, { message: "Please accept the privacy note" }),
  website: z.string().max(0).optional(),
});

export const postSchema = z.object({
  title: z.string().trim().min(3, "Add a title").max(160),
  slug: z
    .string()
    .trim()
    .max(90)
    .optional()
    .transform((value) => value || undefined),
  excerpt: z.string().trim().max(320).optional().default(""),
  body: z.string().trim().min(20, "Add some content").max(60000),
  status: z.enum(["draft", "published"]).default("draft"),
  categoryName: z.string().trim().max(40).optional().default("Notes"),
  tags: z.string().trim().max(200).optional().default(""),
  featured: z.coerce.boolean().optional().default(false),
});

export function flattenIssues(error) {
  const fieldErrors = error?.flatten?.().fieldErrors || {};
  const first = Object.values(fieldErrors).flat().filter(Boolean)[0];
  return first || "Something went wrong. Please try again.";
}
