const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = process.env.PORT || 3000;

// Set your Supabase credentials (use env vars in production)
const supabaseUrl = process.env.VITE_SUPABASE_URL || "YOUR_SUPABASE_URL";
const supabaseAnonKey =
  process.env.VITE_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Default meta tags
const defaultMeta = {
  title: "Digital Business Card Builder - SCC Infotech LLP",
  description:
    "Create, manage, and share your digital business card with SCC Infotech LLP's AI-powered platform. Build professional digital business cards in minutes.",
  image:
    "https://github.com/yash131120/DBC_____logo/blob/main/DBCLOGO_2.png?raw=true",
  url: "https://dbc.sccinfotech.com",
  author: "SCC Infotech LLP",
};

app.get("/c/:slug", async (req, res) => {
  const { slug } = req.params;
  let meta = {
    ...defaultMeta,
    url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
  };

  // Fetch card data from Supabase
  const { data: card, error } = await supabase
    .from("business_cards")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (card && !error) {
    meta = {
      title: `${card.title || "Digital Business Card"} - ${
        card.company || "Professional"
      }`,
      description: `${
        card.bio || `Connect with ${card.title || "this professional"}`
      }${card.position ? ` - ${card.position}` : ""}${
        card.company ? ` at ${card.company}` : ""
      }`,
      image: card.avatar_url || defaultMeta.image,
      url: meta.url,
      author: card.title || defaultMeta.author,
      name: card.title,
      company: card.company,
      profession: card.position,
      bio: card.bio,
    };
  }

  // Render HTML with meta tags
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${meta.title}</title>
        <meta name="description" content="${meta.description}" />
        <meta name="author" content="${meta.author}" />
        <meta name="theme-color" content="#3b82f6" />
        <!-- Open Graph -->
        <meta property="og:title" content="${meta.title}" />
        <meta property="og:description" content="${meta.description}" />
        <meta property="og:image" content="${meta.image}" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <meta property="og:url" content="${meta.url}" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Digital Business Card Builder" />
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${meta.title}" />
        <meta name="twitter:description" content="${meta.description}" />
        <meta name="twitter:image" content="${meta.image}" />
        <meta name="twitter:site" content="@sccinfotech" />
        <!-- Fallbacks -->
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="icon" type="image/svg+xml" href="https://github.com/yash131120/DBC_____logo/blob/main/DBCLOGO_2.png?raw=true" />
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
  `);
});

// Serve static files (React build)
app.use(express.static("dist")); // or 'build' if using CRA

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
