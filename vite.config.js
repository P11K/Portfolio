import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Portfolio/", // sesuai dengan path deploy GitHub Pages
  server: {
    strictPort: true,
    // jangan ubah fs.allow — Vite sudah otomatis mengizinkan folder public
  },
});
