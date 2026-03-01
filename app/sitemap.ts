import { getBlogPosts } from "app/blog/utils";

export const baseUrl = "https://daehunlee.com";

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  let routes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  return [...routes, ...blogs];
}
