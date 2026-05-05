import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    sentryVitePlugin({
    org: "unity-sports",
    project: "javascript-react",
    authToken: process.env.SENTRY_AUTH_TOKEN, 
  }),
  ],
   build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-dom/client"],
          router: ["react-router-dom"],
          redux: ["@reduxjs/toolkit", "react-redux"],
          tiptap: [
            "@tiptap/react",
            "@tiptap/starter-kit",
            "@tiptap/extension-heading",
            "@tiptap/extension-text-align",
            "@tiptap/extension-underline",
          ],
          ui: [
            "lucide-react",
            "@radix-ui/react-dialog",
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
          ],
          forms: [
            "react-hook-form",
            "@hookform/resolvers",
            "zod",
          ],
          utils: [
            "date-fns",
            "react-day-picker",
            "dompurify",
            "react-hot-toast",
            "react-error-boundary",
          ],
        }
      }
    }
  }
})
