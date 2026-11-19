// UP Dent demo homepage (Astro 5). Preview and production differ only by environment variables:
// SITE_URL — absolute address for canonical (unset: canonical is the page path).
import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  build: { inlineStylesheets: "auto" },
  compressHTML: true,
  devToolbar: { enabled: false },
});
