import korzavoLogo from "@/assets/brand/korzavo-logo.png";

export const LOGO_URL = korzavoLogo;
export const CURRENCY = "NZD";
// SITE_URL must match the domain the site is actually served from — it feeds
// canonical URLs, Open Graph tags and structured data. Update it (plus
// index.html, public/sitemap.xml, public/robots.txt and public/llms.txt) when
// the live domain changes.
export const SITE_URL = "https://korzavo.com";
export const SITE_NAME = "Korzavo";
// General enquiries go to info@, customer service (orders, returns) to support@.
export const EMAIL_GENERAL = "info@korzavo.com";
export const EMAIL_SUPPORT = "support@korzavo.com";
export const BRAND_TAGLINE = "Performance Nutrition & Supplements";

export const formatNZD = (n) => `$${Number(n || 0).toFixed(2)}`;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Performance Nutrition", to: "/performance-nutrition" },
  { label: "The Stack", to: "/stack" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
