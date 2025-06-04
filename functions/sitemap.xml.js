import known from '../known.json';

export async function onRequestGet(context) {

  const baseUrl = "https://nano.to";

  const staticPaths = [];

  // Filter out entries where sitemap is explicitly set to "false"
  const dynamicPaths = known
    .filter(entry => entry.sitemap !== "false")
    .map(entry => `/${encodeURIComponent(entry.name)}`);

  const allPaths = [...staticPaths, ...dynamicPaths];

  const lastMod = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths.map(path => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
  
}