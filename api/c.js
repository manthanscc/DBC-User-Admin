


// Polyfill fetch for Node.js < 18
const fetch = global.fetch || require('node-fetch');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

module.exports = async (req, res) => {
  try {
    // Robust slug extraction
    let slug = null;
    if (req.query && req.query.slug) {
      slug = req.query.slug;
    } else if (req.url) {
      const match = req.url.match(/\/c\/([^/?#]+)/);
      if (match) slug = match[1];
    }

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      res.status(500).send('Server misconfiguration: missing Supabase env vars');
      return;
    }

    if (!slug) {
      // fallback to default meta tags
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Cache-Control', 'public, max-age=60');
      res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Digital Business Card Builder - SCC Infotech LLP</title>
  <meta name="description" content="AI-powered platform for creating and sharing professional digital business cards." />
  <meta property="og:title" content="Digital Business Card Builder - SCC Infotech LLP" />
  <meta property="og:description" content="AI-powered platform for creating and sharing professional digital business cards." />
  <meta property="og:image" content="https://businesscardsscc.vercel.app/DBCLOGO_2.png" />
  <meta property="og:url" content="https://businesscardsscc.vercel.app" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Digital Business Card Builder - SCC Infotech LLP" />
  <meta name="twitter:description" content="AI-powered platform for creating and sharing professional digital business cards." />
  <meta name="twitter:image" content="https://businesscardsscc.vercel.app/DBCLOGO_2.png" />
  <meta name="twitter:site" content="@sccinfotech" />
</head>
<body>
  <p>Redirecting to your card...</p>
</body>
</html>`);
      return;
    }

    // Fetch card data from Supabase REST API
    let data = null;
    let fetchError = null;
    try {
      const resp = await fetch(
        `${SUPABASE_URL}/rest/v1/business_cards?slug=eq.${encodeURIComponent(slug)}&is_published=eq.true&select=id,title,company,position,avatar_url,bio`,
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
      fetchError = e;
      data = null;
      console.error('Supabase fetch error:', e);
    }

    let title = 'Digital Business Card Builder - SCC Infotech LLP';
    let description = 'AI-powered platform for creating and sharing professional digital business cards.';
    let image = 'https://businesscardsscc.vercel.app/DBCLOGO_2.png';
    let cardUrl = `https://businesscardsscc.vercel.app/c/${slug}`;

    if (data) {
      title = data.title || title;
      description = `${data.position || ''}${data.company ? ' at ' + data.company : ''}`.trim() || description;
      image = data.avatar_url || image;
    }

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
  <!-- Debug: ${fetchError ? 'Supabase fetch error' : 'OK'} -->
  <script>window.location.replace('${cardUrl}');</script>
</head>
<body>
  <p>Redirecting to your card...</p>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.status(200).send(html);
  } catch (err) {
    console.error('API route error:', err);
    res.status(500).send('Internal Server Error');
  }
};
