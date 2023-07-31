import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  let sitename = "https://acme.com";
  return [
    {
      url: `${sitename}/`,
      lastModified: new Date(),
    },
    {
      url: `${sitename}/about`,
      lastModified: new Date(),
    },
    {
      url: `${sitename}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${sitename}/legal/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${sitename}/legal/terms-of-service`,
      lastModified: new Date(),
    },
    {
      url: `${sitename}/legal/cookie-policy`,
      lastModified: new Date(),
    },
  ];
}
