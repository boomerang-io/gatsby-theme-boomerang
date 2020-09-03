const contentConfig = require("./contentConfig");

module.exports = {
  pathPrefix: "/BMRG_APP_ROOT_CONTEXT",
  siteMetadata: {
    title: "Boomerang",
    uiShellProductName: "Testing",
    docsContext: "/docs",
    docsLocation: "https://github.ibm.com/essentials-core/core.app.docs/tree/main/content",
    githubUrl: "https://github.ibm.com/essentials-core/core.app.docs",
    siteUrl: "https://launch.boomerangplatform.net/docs",
    headerTitle: "Boomerang Docs",
    description: "Documentation for Boomerang",
    solutions: contentConfig.solutions,
    docsQuickLinks: contentConfig.docsQuickLinks,
    standaloneMode: true,
    navLinks: [
      {
        name: "Home",
        url: "/",
      },
      {
        name: "Docs",
        url: "/docs",
      },
      {
        name: "About",
        url: "/about",
      },
    ],
  },
  plugins: [{ resolve: "@boomerang-io/gatsby-theme-boomerang", options: { lunrSearch: true } }],
};
