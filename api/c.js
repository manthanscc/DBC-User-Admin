
export const config = {
  runtime: 'edge',
};

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default async function handler(req) {
  const url = new URL(req.url);
  const slug = url.pathname.split('/c/')[1]?.split('/')[0];
  if (!slug) {
    // fallback to default index.html
    return fetch(new URL('/', req.url));
  }

  // Fetch card data from Supabase REST API
  let data = null;
  try {
    const resp = await fetch(
      `${SUPABASE_URL}/rest/v1/business_cards?slug=eq.${encodeURIComponent(slug)}&is_published=eq.true&select=id,name,company,position,avatar_url,bio`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    const arr = await resp.json();
    data = arr[0];
  } catch (e) {
    data = null;
  }

  if (!data) {
    // fallback to default index.html
    return fetch(new URL('/', req.url));
  }

  // Build meta tags
  const title = data.name || 'Digital Business Card';
  const description = `${data.position || ''}${data.company ? ' at ' + data.company : ''}`.trim() || 'View my digital business card!';
  const image = data.avatar_url || 'https://businesscardsscc.vercel.app/DBCLOGO_2.png';
  const cardUrl = `https://businesscardsscc.vercel.app/c/${slug}`;

  // HTML with meta tags
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:url" content="${cardUrl}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
  <meta name="twitter:site" content="@sccinfotech" />
  <script>window.location.replace('${cardUrl}');</script>
</head>
<body>
  <p>Redirecting to your card...</p>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html',
      'cache-control': 'public, max-age=60',
    },
  });
}
