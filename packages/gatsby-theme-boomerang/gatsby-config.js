require("dotenv").config();
const path = require("path");

module.exports = (themeOptions) => {
  const { lunrSearch = true, remarkImagesOptions = {} } = themeOptions;
  const optionalPlugins = [];

  if (lunrSearch) {
    optionalPlugins.push({
      resolve: "@gatsby-contrib/gatsby-plugin-elasticlunr-search",
      options: {
        // Fields to index
        fields: ["title", "content"],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            title: (node) => node.fields.title,
            slug: (node) => node.fields.slug,
            content: (node) => node.rawMarkdownBody,
            solution: (node) => node.fields.solution,
            version: (node) => node.fields.version,
            category: (node) => node.fields.category,
          },
        },
      },
    });
  }

  return {
    flags: { PRESERVE_WEBPACK_CACHE: true },
    pathPrefix: "/BMRG_APP_ROOT_CONTEXT",
    siteMetadata: {
      title: "Boomerang",
      description: "Documentation for Boomerang and the IBM Automation Platform",
      uiShellProductName: "",
      docsContext: "",
      docsLocation: "https://github.ibm.com/essentials-core/core.app.docs/tree/main/content",
      homeTitle: "Docs",
      homeDescription: "Documentation for Boomerang and the IBM Automation Platform",
      githubUrl: "https://github.ibm.com/essentials-core/core.app.docs",
      siteUrl: "https://launch.boomerangplatform.net/docs",
      socialLinks: {
        twitter: "boomerang-io",
        github: "https://github.ibm.com/essentials-core",
      },
      navLinks: [
        {
          name: "Home",
          url: "/",
        },
      ],
      linksConfig: [],
      solutionsConfig: [],
      lunrSearch,
      standaloneMode: true,
    },
    plugins: [
      "gatsby-plugin-catch-links",
      "gatsby-plugin-meta-redirect",
      "gatsby-plugin-react-helmet",
      "gatsby-plugin-sitemap",
      "gatsby-plugin-sharp",
      "gatsby-plugin-sass",
      {
        resolve: "gatsby-plugin-manifest",
        options: {
          icon: "./src/favicon.png"
        },
      },
      {
        resolve: "gatsby-plugin-layout",
        options: {
          component: require.resolve("./src/layouts/index.js"),
        },
      },
      {
        resolve: "gatsby-transformer-remark",
        options: {
          plugins: [
            {
              resolve: "gatsby-remark-autolink-headers",
              options: {
                offsetY: "48",
              },
            },
            {
              resolve: "gatsby-remark-images",
              options: {
                quality: 80,
                ...remarkImagesOptions,
              },
            },
            { resolve: "gatsby-remark-prismjs" },
            {
              resolve: "gatsby-remark-copy-linked-files",
            },
            { resolve: "gatsby-remark-external-links" },
          ],
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "docs",
          path: "content",
        },
      },
      {
        resolve: "gatsby-alias-imports",
        options: {
          aliases: {
            "@gatsby-theme-boomerang/assets": path.resolve(__dirname, "src/assets"),
            "@gatsby-theme-boomerang/components": path.resolve(__dirname, "src/components"),
            "@gatsby-theme-boomerang/config": path.resolve(__dirname, "src/config"),
            "@gatsby-theme-boomerang/constants": path.resolve(__dirname, "src/constants"),
            "@gatsby-theme-boomerang/features": path.resolve(__dirname, "src/features"),
            "@gatsby-theme-boomerang/hooks": path.resolve(__dirname, "src/hooks"),
            "@gatsby-theme-boomerang/pages": path.resolve(__dirname, "src/pages"),
            "@gatsby-theme-boomerang/state": path.resolve(__dirname, "src/state"),
            "@gatsby-theme-boomerang/styles": path.resolve(__dirname, "src/styles"),
            "@gatsby-theme-boomerang/utils": path.resolve(__dirname, "src/utils"),
            "@gatsby-theme-boomerang/static": path.resolve(__dirname, "static"),
            "@gatsby-theme-boomerang": path.resolve(__dirname, "."),
          },
        },
      },
    ].concat(optionalPlugins),
  };
};
