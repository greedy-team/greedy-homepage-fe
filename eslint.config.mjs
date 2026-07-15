// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import boundaries from "eslint-plugin-boundaries";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "storybook-static/**",
  ]),
  ...storybook.configs["flat/recommended"],

  // 레이어 경계 강제. import는 app→widgets→features→entities→shared 한 방향만.
  // 자세한 규칙은 docs/adr/005-폴더-구조-축소형-FSD.md 참고.
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "import/resolver": { typescript: { alwaysTryTypes: true } },
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        { type: "widgets", pattern: "src/widgets/**" },
        { type: "features", pattern: "src/features/*/**" },
        { type: "entities", pattern: "src/entities/*/**" },
        { type: "shared", pattern: "src/shared/**" },
      ],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          message:
            "레이어 경계 위반이에요. import는 app→widgets→features→entities→shared 한 방향이고, features끼리는 참조하지 않아요.",
          policies: [
            { from: { element: { types: "app" } }, allow: { to: { element: { types: { anyOf: ["app", "widgets", "features", "entities", "shared"] } } } } },
            { from: { element: { types: "widgets" } }, allow: { to: { element: { types: { anyOf: ["widgets", "features", "entities", "shared"] } } } } },
            { from: { element: { types: "features" } }, allow: { to: { element: { types: { anyOf: ["entities", "shared"] } } } } },
            { from: { element: { types: "entities" } }, allow: { to: { element: { types: "shared" } } } },
            { from: { element: { types: "shared" } }, allow: { to: { element: { types: "shared" } } } },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
