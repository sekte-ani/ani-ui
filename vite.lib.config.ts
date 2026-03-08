import fs from "node:fs"
import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "package.json"), "utf8")
) as {
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

const externalPackages = new Set([
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.peerDependencies ?? {}),
])

function isExternal(id: string) {
  for (const pkg of externalPackages) {
    if (id === pkg || id.startsWith(`${pkg}/`)) {
      return true
    }
  }
  return false
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        client: path.resolve(__dirname, "src/client.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: isExternal,
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
  },
})
