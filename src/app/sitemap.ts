import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
import { papers } from '@/lib/research';
import { siteUrl } from '@/lib/site';

/** Generated at build time, so a new project or paper lands in the sitemap on its own. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...projects.map(({ slug }) => ({
      url: `${siteUrl}/projects/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...papers.map(({ slug }) => ({
      url: `${siteUrl}/research/${slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
