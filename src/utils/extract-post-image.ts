// Pull image URLs out of a post body so the og:image can come from the post
// itself instead of a hardcoded fallback. Posts with no images get no og:image.

const SITE_URL = "https://k1en.me";

// Match inline HTML <img ... src="..."> and markdown ![alt](url) images.
const HTML_IMG = /<img\b[^>]*?\ssrc=["']([^"']+)["']/gi;
const MD_IMG = /!\[[^\]]*\]\(\s*([^)\s]+)/g;

// Collect every image URL referenced in the raw markdown body, in order.
export function extractPostImages(body: string): string[] {
  const urls: string[] = [];
  for (const re of [HTML_IMG, MD_IMG]) {
    re.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = re.exec(body)) !== null) {
      urls.push(match[1]);
    }
  }
  return urls;
}

// Turn a (possibly root-relative) src into an absolute URL for social meta.
function toAbsolute(src: string, siteUrl: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${siteUrl}${src.startsWith("/") ? "" : "/"}${src}`;
}

// Pick one image at random from the post body, absolute-resolved.
// Returns null when the post has no images so callers can omit og:image.
export function pickRandomPostImage(body: string, siteUrl = SITE_URL): string | null {
  const images = extractPostImages(body);
  if (images.length === 0) return null;
  const chosen = images[Math.floor(Math.random() * images.length)];
  return toAbsolute(chosen, siteUrl);
}
