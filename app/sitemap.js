import { getAllPosts, getBlogCategories } from "@/lib/blog/queries";
import { stories } from "@/lib/content/stories";
import { tools } from "@/lib/content/tools";
import { site } from "@/lib/site";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/program", priority: 0.9, changeFrequency: "monthly" },
  { path: "/success-stories", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap() {
  const [posts, categories] = await Promise.all([getAllPosts(), getBlogCategories()]);

  const entries = [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...stories.map((story) => ({
      url: `${site.url}/success-stories/${story.slug}`,
      changeFrequency: "yearly",
      priority: 0.6,
    })),
    ...tools.map((tool) => ({
      url: `${site.url}/tools/${tool.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    ...categories.map((category) => ({
      url: `${site.url}/blog/category/${category.slug}`,
      changeFrequency: "weekly",
      priority: 0.5,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];

  return entries;
}
