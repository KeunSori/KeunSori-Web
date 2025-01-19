import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect", // React 버전 자동 감지
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // React 17 이상에서는 불필요
      "react/jsx-no-target-blank": ["error", { allowReferrer: true }], // 보안 문제 해결
      "@typescript-eslint/no-explicit-any": "off",
      "react/prop-types": "off",
    },
  },
];
