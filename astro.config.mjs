import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://k1en.me",
  integrations: [react()],
  devToolbar: { enabled: false },
  server: { host: true, port: 4321 },
  markdown: {
    shikiConfig: {
      // Single dark theme — code panels read the same in light and dark mode.
      theme: "github-dark",
      wrap: true,
    },
  },
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
  },
});
