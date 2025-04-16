import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    // Default config for JS files (Node.js, Jest, Prettier)
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended", "prettier"],
    env: {
      node: true,  // Enable Node.js globals (require, process, etc.)
      es2021: true,
      jest: true,  // Enable Jest globals for tests
    },
    languageOptions: {
      globals: {
        ...globals.node,  // Add Node.js-specific globals like `require`, `module`, `process`, etc.
        ...globals.browser,  // Optionally include browser globals
      },
    },
    rules: {
      "no-console": "warn",  // Warn for console.log usage
      "consistent-return": "error",  // Enforce consistent return statements
    },
    ignorePatterns: ["node_modules/", "coverage/", "lcov-report/"],  // Ignore directories like node_modules and coverage
  },
]);
