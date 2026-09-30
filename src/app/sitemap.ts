import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://maengdok.fr/', lastModified: new Date() }];
}
