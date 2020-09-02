require("dotenv").config();
const path = require("path");

module.exports = (themeOptions) => {
  const { lunrSearch = true } = themeOptions;
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
    pathPrefix: "/BMRG_APP_ROOT_CONTEXT",
    siteMetadata: {
      title: "Docs",
      description: "Documentation for Boomerang and the IBM Automation Platform",
      docsLocation: "https://github.ibm.com/essentials-core/core.app.docs/tree/main/content",
      headerTitle: "Docs",
      githubUrl: "https://github.ibm.com/essentials-core/core.app.docs",
      siteUrl: "https://launch.boomerangplatform.net/docs",
      standaloneMode: true,
      homeNavigationLinks: [
        {
          text: "Getting Started",
          path: "/boomerang-flow/introduction/overview",
        },
      ],
      solutions: [],
      lunrSearch,
    },
    plugins: [
      "gatsby-plugin-catch-links",
      "gatsby-plugin-favicon",
      "gatsby-plugin-meta-redirect",
      "gatsby-plugin-react-helmet",
      "gatsby-plugin-sitemap",
      "gatsby-plugin-sharp",
      "gatsby-plugin-sass",
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
            Assets: path.resolve(__dirname, "src/assets"),
            Components: path.resolve(__dirname, "src/components"),
            Config: path.resolve(__dirname, "src/config"),
            Constants: path.resolve(__dirname, "src/constants"),
            Features: path.resolve(__dirname, "src/features"),
            Hooks: path.resolve(__dirname, "src/hooks"),
            Pages: path.resolve(__dirname, "src/pages"),
            State: path.resolve(__dirname, "src/state"),
            Styles: path.resolve(__dirname, "src/styles"),
            Utils: path.resolve(__dirname, "src/utils"),
            Static: path.resolve(__dirname, "static"),
            Root: path.resolve(__dirname, "."),
          },
        },
      },
    ].concat(optionalPlugins),
  };
};
