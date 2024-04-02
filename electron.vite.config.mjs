import { defineConfig } from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  main: {
    outDir: "dist/main",
  },
  preload: {
    outDir: "dist/preload",
  },
  renderer: {
    outDir: "dist/renderer",
    plugins: [react()],
  },
  define: {
    "process.env.VITE_APP_VERSION": JSON.stringify(
      require("./package.json").version
    ),
  },
});
