import globals from "globals";
import pluginJs from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  nextPlugin.configs.recommended,
  nextPlugin.configs["core-web-vitals"],

  {
    plugins: {
      prettier: prettier,
    },
    // prettier/recommended를 사용하여 충돌 규칙을 비활성화하고 prettier 플러그인 활성화
    rules: {
      ...configPrettier.rules,
      "prettier/prettier": [
        "error",
        {
          singleQuote: true, // 작은따옴표 사용
          semi: true,
          tabWidth: 2,
          trailingComma: "es5",
          printWidth: 100,
        },
      ],
    },
  },

  // Next.js ESLint 설정에서 Prettier 규칙을 사용하도록 설정 (MJS 방식에서는 다를 수 있음)
  {
    extends: [
      // ... 기존 extends 유지
      "plugin:prettier/recommended",
    ],
  },
];
