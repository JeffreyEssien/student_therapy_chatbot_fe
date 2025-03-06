import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"], // Add necessary presets
  rules: {
    "no-console": "off", // Example: Disable no-console rule globally
    "react-hooks/exhaustive-deps": "off", // Example: Disable React hook dependency warnings
    "no-unused-vars": "warn", // Change 'error' to 'warn' for unused variables
  },
};


export default eslintConfig;
