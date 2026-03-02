import known from '../known.json';

const BASE_URL = "https://nano.to";
const DEFAULT_IMAGE = BASE_URL + "/dist/images/cover.png";
const SITE_NAME = "Nano.to";
const SITE_DESC = "Name service for Nano currency";

// Skip static assets and API routes
const SKIP_PATTERNS = [
  /^\/(dist|api|functions)\//,
  /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|otf|json|xml|txt|mp4|webp)$/,
];

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function stripHtml(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').trim();
}

function buildMetaTags(entry, url) {
  const name = entry.name;
  const title = `@${name} - ${SITE_NAME}`;
  const desc = entry.title
    ? `@${name}: ${stripHtml(entry.title)} — Nano Name Service`
    : `@${name} on ${SITE_NAME} — Name service for Nano currency`;
  const image = entry.image || DEFAULT_IMAGE;
  const canonical = `${BASE_URL}/${encodeURIComponent(name)}`;

  const escapedTitle = escapeHtml(title);
  const escapedDesc = escapeHtml(desc);
  const escapedImage = escapeHtml(image);
  const escapedCanonical = escapeHtml(canonical);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": `@${name}`,
    "url": canonical,
    "description": stripHtml(desc),
    "mainEntity": {
      "@type": "Person",
      "name": name,
      "url": canonical,
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": BASE_URL,
      "description": SITE_DESC,
    }
  };

  if (entry.image) jsonLd.mainEntity.image = entry.image;
  if (entry.github) jsonLd.mainEntity.sameAs = jsonLd.mainEntity.sameAs || [];
  if (entry.github) jsonLd.mainEntity.sameAs.push(`https://github.com/${entry.github.replace('https://github.com/', '').replace('@', '')}`);
  if (entry.twitter) {
    jsonLd.mainEntity.sameAs = jsonLd.mainEntity.sameAs || [];
    jsonLd.mainEntity.sameAs.push(`https://twitter.com/${entry.twitter.replace('https://twitter.com/', '').replace('@', '')}`);
  }
  if (entry.website) {
    jsonLd.mainEntity.sameAs = jsonLd.mainEntity.sameAs || [];
    var site = entry.website.startsWith('http') ? entry.website : 'https://' + entry.website;
    jsonLd.mainEntity.sameAs.push(site);
  }

  return `
    <title>${escapedTitle}</title>
    <meta name="description" content="${escapedDesc}">
    <link rel="canonical" href="${escapedCanonical}">
    <meta property="og:type" content="profile">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta property="og:title" content="${escapedTitle}">
    <meta property="og:description" content="${escapedDesc}">
    <meta property="og:url" content="${escapedCanonical}">
    <meta property="og:image" content="${escapedImage}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${escapedTitle}">
    <meta name="twitter:description" content="${escapedDesc}">
    <meta name="twitter:image" content="${escapedImage}">
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
}

function buildHomeMeta() {
  const title = `${SITE_NAME} - Name Service for Nano Currency`;
  const desc = SITE_DESC + ". Register a human-readable name for your Nano address.";
  const canonical = BASE_URL + "/";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": BASE_URL,
    "description": desc,
    "potentialAction": {
      "@type": "SearchAction",
      "target": BASE_URL + "/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(desc)}">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(desc)}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:image" content="${DEFAULT_IMAGE}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(desc)}">
    <meta name="twitter:image" content="${DEFAULT_IMAGE}">
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // Skip static assets
  if (SKIP_PATTERNS.some(p => p.test(path))) {
    return context.next();
  }

  // Get the original response
  const response = await context.next();

  // Only transform HTML responses
  const contentType = response.headers.get("Content-Type") || "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  let html = await response.text();

  // Determine which meta tags to inject
  let metaTags;
  const nameSlug = decodeURIComponent(path.replace('/', '').replace('@', '').replace(':', '')).toLowerCase();

  if (!nameSlug || path === '/') {
    metaTags = buildHomeMeta();
  } else {
    const entry = known.find(e => e.name.toLowerCase() === nameSlug);
    if (entry) {
      metaTags = buildMetaTags(entry, url);
    } else {
      metaTags = buildHomeMeta();
    }
  }

  // Replace existing <title> and meta tags, inject before </head>
  // Remove existing tags we're replacing
  html = html.replace(/<title>[^<]*<\/title>/, '');
  html = html.replace(/<meta name="description"[^>]*>/, '');
  html = html.replace(/<meta property="og:title"[^>]*>/, '');
  html = html.replace(/<meta property="og:image"[^>]*>/, '');
  html = html.replace(/<meta property="twitter:image"[^>]*>/, '');

  // Inject new tags before </head>
  html = html.replace('</head>', metaTags + '\n  </head>');

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  });
}
