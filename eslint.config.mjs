import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import sortImportsByLengthRule from "./tools/eslint-rules/sort-imports-by-length.mjs"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "local-import-order": {
        rules: {
          "sort-by-length": sortImportsByLengthRule,
        },
      },
    },
    rules: {
      "local-import-order/sort-by-length": "error",
    },
  },
])

export default eslintConfig
