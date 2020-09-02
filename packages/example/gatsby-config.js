const contentConfig = require("./contentConfig");

module.exports = {
  siteMetadata: {
    pathPrefix: "/BMRG_APP_ROOT_CONTEXT",
    title: "Docs",
    docsLocation: "https://github.ibm.com/essentials-core/core.app.docs/tree/main/content",
    githubUrl: "https://github.ibm.com/essentials-core/core.app.docs",
    siteUrl: "https://launch.boomerangplatform.net/docs",
    headerTitle: "Boomerang Docs",
    description: "Documentation for Boomerang",
    solutions: contentConfig.solutions,
    homeNavigationLinks: contentConfig.homeNavigationLinks,
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
  plugins: [
    { resolve: "gatsby-theme-boomerang", options: {} },
    // Override so not included
    {
      resolve: "@gatsby-contrib/gatsby-plugin-elasticlunr-search",
      options: {
        // Fields to index
        fields: [],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {},
        },
      },
    },
  ],
};
