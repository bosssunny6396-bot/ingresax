import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ingresax.com",
      lastModified: new Date(),
    },
    {
      url: "https://ingresax.com/calculator",
      lastModified: new Date(),
    },
    {
      url: "https://ingresax.com/insights",
      lastModified: new Date(),
    },
  ];
}