import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import fs from "fs";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // server: {
  //   port: 5173,
  //   https: {
  //     key: fs.readFileSync("./ssl/key.pem"),
  //     cert: fs.readFileSync("./ssl/cert.pem"),
  //   },
  // },
});
