const contentConfig = require("./contentConfig");

module.exports = {
  pathPrefix: "/BMRG_APP_ROOT_CONTEXT",
  siteMetadata: {
    title: "Boomerang Docs",
    description: "Example Boomerang Site",
    uiShellProductName: "OSS",
    docsContext: "/docs",
    docsLocation: "https://github.ibm.com/essentials-core/core.app.docs/tree/main/content",
    githubUrl: "https://github.ibm.com/essentials-core/core.app.docs",
    siteUrl: "https://launch.boomerangplatform.net/docs",
    socialLinks: {
      twitter: "boomerang-io",
      github: "https://github.ibm.com/essentials-core",
    },
    homeTitle: "Boomerang Open Source",
    homeDescription: "Learn the projects",
    linksConfig: contentConfig.linksConfig,
    solutionsConfig: contentConfig.solutionsConfig,
    footerLinksConfig: contentConfig.footerLinksConfig,
    standaloneMode: true,
    isGaActive: true,
    navLinks: [
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
