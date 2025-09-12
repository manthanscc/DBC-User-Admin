import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is not defined in environment variables');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query;
  if (!slug || typeof slug !== 'string') {
    res.status(400).send('Missing card slug');
    return;
  }

  // Fetch card data
  const { data: card, error: cardError } = await supabase
    .from('business_cards')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (cardError || !card) {
    // Fallback OG tags
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta property="og:title" content="Digital Business Card Builder" />
  <meta property="og:description" content="Create, manage, and share your digital business card with SCC Infotech LLP's AI-powered platform." />
  <meta property="og:image" content="https://github.com/yash131120/DBC_____logo/blob/main/DBCLOGO_2.png?raw=true" />
  <meta property="og:url" content="https://businesscardscc.vercel.app/c/${slug}" />
  <meta property="og:type" content="website" />
  <meta http-equiv="refresh" content="0; url=/c/${slug}" />
</head>
<body></body>
</html>`);
    return;
  }

  // Fetch profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', card.user_id)
    .single();

  // Compose OG data
  const ogTitle = `${profile?.name || card.title || 'Business Card'}${card.company ? ' - ' + card.company : ''}`;
  const ogDescription = card.bio || profile?.bio || card.position || 'View my digital business card!';
  const ogImage = card.avatar_url || profile?.avatar_url || 'https://github.com/yash131120/DBC_____logo/blob/main/DBCLOGO_2.png?raw=true';
  const ogUrl = `https://businesscardscc.vercel.app/c/${slug}`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta property="og:title" content="${escapeHtml(ogTitle)}" />
  <meta property="og:description" content="${escapeHtml(ogDescription)}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:url" content="${ogUrl}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(ogTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(ogDescription)}" />
  <meta name="twitter:image" content="${ogImage}" />
  <meta http-equiv="refresh" content="0; url=/c/${slug}" />
</head>
<body></body>
</html>`);
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
