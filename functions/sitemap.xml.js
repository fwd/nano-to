import known from '../known.json';

export async function onRequestGet(context) {

  const baseUrl = "https://nano.to";

  // Homepage
  const homepage = `
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  // Filter out entries where sitemap is explicitly set to "false"
  const nameUrls = known
    .filter(entry => entry.sitemap !== "false")
    .map(entry => {
      const lastmod = entry.expires_unix
        ? new Date(entry.expires_unix * 1000).toISOString().split('T')[0]
        : new Date(entry.created_unix * 1000).toISOString().split('T')[0];
      const hasProfile = entry.image || entry.github || entry.twitter || entry.website || entry.title;
      return `
  <url>
    <loc>${baseUrl}/${encodeURIComponent(entry.name)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${hasProfile ? '0.8' : '0.6'}</priority>
  </url>`;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${homepage}${nameUrls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });

}
