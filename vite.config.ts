import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import svgr from "vite-plugin-svgr"
import { ViteMinifyPlugin } from "vite-plugin-minify"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    ViteMinifyPlugin({
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true
    })
  ],
  server: {
    host: "local.prediza.io",
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
  base: "/finance/",
})
