// vite.config.ts
import { defineConfig, type ServerOptions } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import path from "path";

const server: ServerOptions = {
  port: 5173,
};

export default defineConfig({
  plugins: [react(), basicSsl()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  server, // <- 타입을 ServerOptions로 고정해서 넘김
});
