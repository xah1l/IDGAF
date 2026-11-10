import { defineConfig } from "vite";

export default defineConfig({
  // GitHub Pages serves this repository under /IDGAF/.
  base: "/IDGAF/",
  build: {
    outDir: "dist",
    sourcemap: false
  }
});
