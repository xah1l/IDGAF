import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  // GitHub Pages serves this repository under /IDGAF/.
  base: "/IDGAF/",
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), "index.html"),
        app: resolve(process.cwd(), "app.html"),
        auth: resolve(process.cwd(), "auth.html")
      }
    }
  }
});
