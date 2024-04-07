// vite.config.ts
import { defineConfig } from "file:///Users/monguyen/Documents/GitHub/TeamB-prod/.yarn/__virtual__/vite-virtual-da14a7aec2/0/cache/vite-npm-4.5.3-5cedc7cb8f-82efe1bc6d.zip/node_modules/vite/dist/node/index.js";
import react from "file:///Users/monguyen/Documents/GitHub/TeamB-prod/.yarn/__virtual__/@vitejs-plugin-react-swc-virtual-72471b82ad/0/cache/@vitejs-plugin-react-swc-npm-3.6.0-18140d7bb7-8bff5065e9.zip/node_modules/@vitejs/plugin-react-swc/index.mjs";
import eslint from "file:///Users/monguyen/Documents/GitHub/TeamB-prod/.yarn/__virtual__/vite-plugin-eslint-virtual-1f4e08d8c3/0/cache/vite-plugin-eslint-npm-1.8.1-844ad445f5-65598893e2.zip/node_modules/vite-plugin-eslint/dist/index.mjs";
import * as process from "process";
console.log(process.env.FRONTEND_PORT);
var vite_config_default = defineConfig({
  resolve: {
    preserveSymlinks: true
  },
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.FRONTEND_PORT),
    proxy: {
      "/api": process.env.BACKEND_SOURCE + ":" + process.env.BACKEND_PORT
    },
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: "build"
  },
  plugins: [react(), eslint()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbW9uZ3V5ZW4vRG9jdW1lbnRzL0dpdEh1Yi9UZWFtQi1wcm9kL2FwcHMvZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tb25ndXllbi9Eb2N1bWVudHMvR2l0SHViL1RlYW1CLXByb2QvYXBwcy9mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbW9uZ3V5ZW4vRG9jdW1lbnRzL0dpdEh1Yi9UZWFtQi1wcm9kL2FwcHMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBlc2xpbnQgZnJvbSBcInZpdGUtcGx1Z2luLWVzbGludFwiO1xuaW1wb3J0ICogYXMgcHJvY2VzcyBmcm9tIFwicHJvY2Vzc1wiO1xuY29uc29sZS5sb2cocHJvY2Vzcy5lbnYuRlJPTlRFTkRfUE9SVCk7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIHByZXNlcnZlU3ltbGlua3M6IHRydWUsXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgIHBvcnQ6IHBhcnNlSW50KHByb2Nlc3MuZW52LkZST05URU5EX1BPUlQpLFxuICAgIHByb3h5OiB7XG4gICAgICBcIi9hcGlcIjogcHJvY2Vzcy5lbnYuQkFDS0VORF9TT1VSQ0UgKyBcIjpcIiArIHByb2Nlc3MuZW52LkJBQ0tFTkRfUE9SVCxcbiAgICB9LFxuICAgIHdhdGNoOiB7XG4gICAgICB1c2VQb2xsaW5nOiB0cnVlLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcImJ1aWxkXCIsXG4gIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBlc2xpbnQoKV0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlYsU0FBUyxvQkFBb0I7QUFDMVgsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUNuQixZQUFZLGFBQWE7QUFDekIsUUFBUSxJQUFZLFlBQUksYUFBYTtBQUVyQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxrQkFBa0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTSxTQUFpQixZQUFJLGFBQWE7QUFBQSxJQUN4QyxPQUFPO0FBQUEsTUFDTCxRQUFnQixZQUFJLGlCQUFpQixNQUFjLFlBQUk7QUFBQSxJQUN6RDtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsWUFBWTtBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFDN0IsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
