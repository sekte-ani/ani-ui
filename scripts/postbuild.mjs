import fs from "node:fs"
import path from "node:path"

const rootDir = process.cwd()
const distDir = path.join(rootDir, "dist")
const stylesSrc = path.join(rootDir, "src", "styles.css")
const stylesDist = path.join(distDir, "styles.css")

if (!fs.existsSync(distDir)) {
  throw new Error("dist directory not found. Run the library build first.")
}

fs.copyFileSync(stylesSrc, stylesDist)

const declarationFiles = []

function collectDeclarationFiles(currentPath) {
  const entries = fs.readdirSync(currentPath, { withFileTypes: true })
  for (const entry of entries) {
    const entryPath = path.join(currentPath, entry.name)
    if (entry.isDirectory()) {
      collectDeclarationFiles(entryPath)
      continue
    }
    if (entry.isFile() && entry.name.endsWith(".d.ts")) {
      declarationFiles.push(entryPath)
    }
  }
}

function toRelativeAliasImport(fromFile, aliasPath) {
  const fromDir = path.dirname(fromFile)
  const targetPath = path.join(distDir, aliasPath)
  let relativePath = path.relative(fromDir, targetPath).replaceAll(path.sep, "/")
  if (!relativePath.startsWith(".")) {
    relativePath = `./${relativePath}`
  }
  return relativePath
}

collectDeclarationFiles(distDir)

for (const declarationFile of declarationFiles) {
  const source = fs.readFileSync(declarationFile, "utf8")
  const transformed = source
    .replace(
      /((?:import|export)\s+(?:type\s+)?(?:[^"'()]+?\s+from\s+)?["'])@\/([^"']+)(["'])/g,
      (_match, prefix, aliasPath, suffix) =>
        `${prefix}${toRelativeAliasImport(declarationFile, aliasPath)}${suffix}`
    )
    .replace(
      /(import\(\s*["'])@\/([^"']+)(["']\s*\))/g,
      (_match, prefix, aliasPath, suffix) =>
        `${prefix}${toRelativeAliasImport(declarationFile, aliasPath)}${suffix}`
    )

  if (transformed !== source) {
    fs.writeFileSync(declarationFile, transformed, "utf8")
  }
}
