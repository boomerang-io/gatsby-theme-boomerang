module.exports = {
  extends: [
    "react-app",
    "plugin:cypress/recommended",
    "plugin:jest/recommended",
    "plugin:jest-dom/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:testing-library/react",
  ],
  plugins: ["jest", "jest-dom", "jsx-a11y", "testing-library"],
  env: {
    "jest/globals": true,
    "cypress/globals": true,
  },
  globals: {
    ibmStats: true,
    cy: true,
    shallow: true,
    render: true,
    mount: true,
    renderer: true,
    rtlRender: true,
    rtlRouterRender: true,
    rtlContextRouterRender: true,
  },
  settings: {
    "import/resolver": {
      alias: [
        ["@gatsby-theme-boomerang/assets", "./src/assets"],
        ["@gatsby-theme-boomerang/components", "./src/components"],
        ["@gatsby-theme-boomerang/config", "./src/config"],
        ["@gatsby-theme-boomerang/constants", "./src/constants"],
        ["@gatsby-theme-boomerang/features", "./src/features"],
        ["@gatsby-theme-boomerang/hooks", "./src/hooks"],
        ["@gatsby-theme-boomerang/pages", "./src/pages"],
        ["@gatsby-theme-boomerang/state", "./src/state"],
        ["@gatsby-theme-boomerang/styles", "./src/styles"],
        ["@gatsby-theme-boomerang/utils", "./src/utils"],
        ["@gatsby-theme-boomerang/static", "./static"],
        ["@gatsby-theme-boomerang/root", "."],
      ],
    },
  },
  overrides: [
    {
      files: ["cypress/**/*.spec.js"],
      rules: {
        "cypress/no-unnecessary-waiting": "off",
        "jest/expect-expect": "off",
        "testing-library/await-async-query": "off",
      },
    },
  ],
};
