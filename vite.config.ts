import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig(({ command }) => {
  return {
    plugins: [
      tsConfigPaths(),
      tanstackStart({
        server: { entry: "server" },
      }),
      react(),
      tailwindcss(),
      // Add Cloudflare only during production builds as requested/intended
      command === "build" ? cloudflare() : null,
    ].filter(Boolean),
  };
});
