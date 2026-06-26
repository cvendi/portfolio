import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://venditto.dev",
  integrations: [sitemap()],
  adapter: cloudflare({
    imageService: { build: "compile", runtime: "cloudflare-binding" },
    platformProxy: { enabled: true },
  }),
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
