import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { sitemapPlugin } from "./vite-plugin-sitemap";

const SITE_URL = process.env.SITE_URL ?? "https://spconstructiondfw.com";

const rawPort = process.env.PORT ?? "3000";
const port = Number(rawPort);

const basePath = process.env.BASE_PATH ?? "/";

const browserMapsKey = process.env.GOOGLE_MAPS_BROWSER_API_KEY ?? "";
const apiBaseUrl = process.env.VITE_API_BASE_URL ?? "";

export default defineConfig({
  base: basePath,
  define: {
    "import.meta.env.VITE_GOOGLE_MAPS_BROWSER_API_KEY": JSON.stringify(browserMapsKey),
    "import.meta.env.VITE_API_BASE_URL": JSON.stringify(apiBaseUrl),
  },
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    sitemapPlugin({ siteUrl: SITE_URL }),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Split vendor code into logical, long-term-cacheable chunks. Everything
        // stays statically imported (no dynamic import()), so the prerender
        // still renders complete pages — this only changes how the bundle is
        // physically split across files, keeping each chunk under the 500 kB
        // warning threshold and improving first-paint via parallel/modulepreload.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-is)[\\/]/.test(id)) {
            return "react-vendor";
          }
          if (id.includes("@radix-ui")) return "radix-vendor";
          if (/@googlemaps|google\.maps/.test(id)) return "maps-vendor";
          if (id.includes("@tanstack")) return "query-vendor";
          if (/lucide-react|embla-carousel|recharts|framer-motion/.test(id)) {
            return "ui-vendor";
          }
          return "vendor";
        },
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
