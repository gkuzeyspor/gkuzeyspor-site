import type { MetadataRoute } from "next";

const BASE_URL = "https://www.gkuzeyspor.com";

const ROUTES = [
  "",
  "/tesislerimiz",
  "/sporcular",
  "/basarilarimiz",
  "/emegi-gecenler",
  "/yas-kategorileri",
  "/album/fotograf",
  "/album/video",
  "/program/antrenman",
  "/program/mac",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
  }));
}
