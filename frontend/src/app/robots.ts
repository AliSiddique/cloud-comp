import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    let sitename = "https://acme.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/blog-admin-dashboard/",
    },
    sitemap: `${sitename}/sitemap.xml`,
  };
}
