const config = {
  solutions: [
    {
      title: "Boomerang Core",
      description: "Whether you're new to CI or a seasoned veteran, this contains the basics and how-to guides.",
      path: "/boomerang-core/introduction/overview",
      solution: "boomerang-core",
    },
    {
      title: "Boomerang CICD",
      description: "Whether you're new to CI or a seasoned veteran, this contains the basics and how-to guides.",
      path: "/boomerang-cicd/introduction/getting-started",
      solution: "boomerang-cicd",
      categoryOrder: ["introduction"],
    },
    {
      title: "IBM Services Engineering",
      description: "Whether you're new to CI or a seasoned veteran, this contains the basics and how-to guides.",
      path: "/ise/standards/overview",
      solution: "ise",
    },
  ],
  homeNavigationLinks: [
    {
      text: "Getting Started",
      path: "/boomerang/introduction/getting-started",
    },
    {
      text: "What's New",
      path: "/boomerang/introduction/whats-new",
    },
    {
      text: "FAQ",
      path: "/boomerang/introduction/frequently-asked-questions",
    },
  ],
};

module.exports = config;
