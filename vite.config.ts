import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./",
  plugins: [
    svelte(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "LearnKit",
        short_name: "LearnKit",
        description: "Follow-along lessons with instant feedback. Works offline.",
        theme_color: "#15141d",
        background_color: "#15141d",
        display: "standalone",
        start_url: "./",
        icons: [{ src: "icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
      },
      workbox: { globPatterns: ["**/*.{js,css,html,svg,woff2}"] },
    }),
  ],
  test: { include: ["test/**/*.test.ts"] },
});
