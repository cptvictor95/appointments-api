import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  {
    rules: {
      "no-console": "off",
      "no-undef": "off",
      "no-unused-vars": "off",
      "no-useless-constructor": "off",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
