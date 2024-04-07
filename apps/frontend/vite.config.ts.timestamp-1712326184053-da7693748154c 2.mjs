// vite.config.ts
import { defineConfig } from "file:///C:/Users/thund/WebstormProjects/TeamB-prod/.yarn/__virtual__/vite-virtual-da14a7aec2/0/cache/vite-npm-4.5.3-5cedc7cb8f-82efe1bc6d.zip/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/thund/WebstormProjects/TeamB-prod/.yarn/__virtual__/@vitejs-plugin-react-swc-virtual-72471b82ad/0/cache/@vitejs-plugin-react-swc-npm-3.6.0-18140d7bb7-8bff5065e9.zip/node_modules/@vitejs/plugin-react-swc/index.mjs";
import eslint from "file:///C:/Users/thund/WebstormProjects/TeamB-prod/.yarn/__virtual__/vite-plugin-eslint-virtual-1f4e08d8c3/0/cache/vite-plugin-eslint-npm-1.8.1-844ad445f5-65598893e2.zip/node_modules/vite-plugin-eslint/dist/index.mjs";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0aHVuZFxcXFxXZWJzdG9ybVByb2plY3RzXFxcXFRlYW1CLXByb2RcXFxcYXBwc1xcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdGh1bmRcXFxcV2Vic3Rvcm1Qcm9qZWN0c1xcXFxUZWFtQi1wcm9kXFxcXGFwcHNcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3RodW5kL1dlYnN0b3JtUHJvamVjdHMvVGVhbUItcHJvZC9hcHBzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgZXNsaW50IGZyb20gXCJ2aXRlLXBsdWdpbi1lc2xpbnRcIjtcbmltcG9ydCAqIGFzIHByb2Nlc3MgZnJvbSBcInByb2Nlc3NcIjtcbmNvbnNvbGUubG9nKHByb2Nlc3MuZW52LkZST05URU5EX1BPUlQpO1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBwcmVzZXJ2ZVN5bWxpbmtzOiB0cnVlLFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICBwb3J0OiBwYXJzZUludChwcm9jZXNzLmVudi5GUk9OVEVORF9QT1JUKSxcbiAgICBwcm94eToge1xuICAgICAgXCIvYXBpXCI6IHByb2Nlc3MuZW52LkJBQ0tFTkRfU09VUkNFICsgXCI6XCIgKyBwcm9jZXNzLmVudi5CQUNLRU5EX1BPUlQsXG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgdXNlUG9sbGluZzogdHJ1ZSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogXCJidWlsZFwiLFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKSwgZXNsaW50KCldLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdXLFNBQVMsb0JBQW9CO0FBQ3JZLE9BQU8sV0FBVztBQUNsQixPQUFPLFlBQVk7QUFDbkIsWUFBWSxhQUFhO0FBQ3pCLFFBQVEsSUFBWSxZQUFJLGFBQWE7QUFFckMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1Asa0JBQWtCO0FBQUEsRUFDcEI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU0sU0FBaUIsWUFBSSxhQUFhO0FBQUEsSUFDeEMsT0FBTztBQUFBLE1BQ0wsUUFBZ0IsWUFBSSxpQkFBaUIsTUFBYyxZQUFJO0FBQUEsSUFDekQ7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQzdCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
