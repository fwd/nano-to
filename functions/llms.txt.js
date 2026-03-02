import known from '../known.json';

export async function onRequestGet(context) {

  const now = Math.floor(Date.now() / 1000);

  const header = `# Nano.to — Name Service for Nano Currency

> Nano.to is a human-readable name service for the Nano cryptocurrency.
> It maps short usernames (like @James) to Nano wallet addresses.
> Users can register, renew, and customize their names with social links, titles, and images.
> Names can receive payments, donations, and be used as checkout pages.
>
> Website: https://nano.to
> GitHub: https://github.com/nano-to/nano-to
>
> Nano (XNO) is a feeless, instant, and energy-efficient digital currency.
> Learn more about Nano: https://nano.org

## How it works

- Visit https://nano.to to search and register a name.
- Visit https://nano.to/{name} to view a name's checkout page.
- Names cost Nano to register and renew (typically 1-2 year terms).
- Each name maps to a single Nano address for receiving payments.
- Names can optionally have: title, website, GitHub, Twitter, Mastodon, location, profile image, and custom checkout plans.

## API

- Name lookup: GET https://nano.to/.well-known/nano-currency.json?names={name}
- Full registry: GET https://nano.to/known.json
- Sitemap: https://nano.to/sitemap.xml

## Registered Names

Total: ${known.length}
`;

  const entries = known.map(entry => {
    const expired = entry.expires_unix && entry.expires_unix < now;
    const lines = [`### @${entry.name}`];
    lines.push(`- Address: ${entry.address}`);
    lines.push(`- Registered: ${entry.created}`);
    lines.push(`- Expires: ${entry.expires}${expired ? ' [EXPIRED]' : ''}`);
    if (entry.title) lines.push(`- Title: ${entry.title}`);
    if (entry.website) lines.push(`- Website: ${entry.website}`);
    if (entry.github) lines.push(`- GitHub: ${entry.github}`);
    if (entry.twitter) lines.push(`- Twitter: ${entry.twitter}`);
    if (entry.location) lines.push(`- Location: ${entry.location}`);
    if (Number(entry.for_sale)) lines.push(`- Status: FOR SALE`);
    lines.push(`- Checkout: https://nano.to/${encodeURIComponent(entry.name)}`);
    return lines.join('\n');
  }).join('\n\n');

  return new Response(header + '\n' + entries + '\n', {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });

}
