// frontend/server/routes/sitemap.xml.ts
export default defineEventHandler(async (event) => {
  const routes = [
    "/",
    "/dich-vu",
    "/du-an",
    "/pmis",
    "/tin-tuc",
    "/lien-he",
    "/dich-vu/bim-3d",
    "/dich-vu/trien-khai-ban-ve",
    "/dich-vu/bim-5d",
    "/dich-vu/bim-6d",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
    <url>
      <loc>https://techbuilding.vn${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${route === "/" ? "1.0" : "0.8"}</priority>
    </url>`,
    )
    .join("")}
</urlset>`;

  event.node.res.setHeader("Content-Type", "text/xml");
  return sitemap;
});
