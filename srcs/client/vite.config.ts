import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "/app",

  build: {
    outDir: "dist",
  },

  server: {
    host: "0.0.0.0",
    port: 3000,
    hmr: {
      host: "localhost",
      port: 3000,
    },
  },
});
