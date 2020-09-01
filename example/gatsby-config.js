const contentConfig = require("./contentConfig");
module.exports = {
  plugins: [{ resolve: `gatsby-theme-boomerang-docs`, options: {} }],
  siteMetadata: { solutions: contentConfig.solutions, homeNavigationLinks: contentConfig.homeNavigationLinks },
};
