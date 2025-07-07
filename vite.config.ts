import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // ✅ 추가

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ✅ @를 src로 매핑
    },
  },
});
