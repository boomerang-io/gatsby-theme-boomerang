const config = {
  solutions: [
    {
      title: "Boomerang Platform",
      description: "Overview, Architecture, and general information of the Boomerang Platform.",
      path: "/docs/boomerang/introduction/overview",
      solution: "boomerang",
      categoryOrder: ["introduction", "architecture"],
    },
    {
      title: "Essentials Core",
      description: "Core capabilities and services for a common, centralized, and secure platform.",
      path: "/docs/essentials-core/introduction/overview",
      solution: "essentials-core",
      categoryOrder: ["introduction", "architecture", "how-to-guide", "how-to-admin", "installing", "extending"],
    },
    {
      title: "Boomerang Core",
      description:
        "Core capabilities and services for a common, centralized, and secure platform. For the latest, please visit Essentials Core.",
      path: "/docs/boomerang-core/introduction/overview",
      solution: "boomerang-core",
      categoryOrder: ["introduction", "architecture", "how-to-guide", "how-to-admin", "installing", "extending"],
    },
    {
      title: "Boomerang CICD",
      description:
        "Whether you're new to CICD or a seasoned veteran, this contains the guidance for Components, Pipelines, Insights, Scorecard, Lib, and Bosun Policies.",
      path: "/docs/boomerang-cicd/introduction/getting-started",
      solution: "boomerang-cicd",
      categoryOrder: ["introduction", "architecture", "getting-to-know", "how-to-guide"],
    },
    {
      title: "Boomerang Flow",
      description: "Cloud native workflow orchestration.",
      path: "/docs/boomerang-flow/introduction/overview",
      solution: "boomerang-flow",
      categoryOrder: ["introduction", "architecture", "getting-to-know", "installing"],
    },
    {
      title: "IBM Automation Platform",
      description:
        "A fully integrated enterprise-ready ecosystem designed to accelerate the development, implementation, governance, and operations of intelligent workflow and automated environments.",
      path: "/docs/iap/introduction/overview",
      solution: "iap",
      categoryOrder: ["introduction"],
    },
    {
      title: "Automation Control Center",
      description:
        "Allows business managers to monitor their hybrid workforces and automated business processes and understand current workloads and performance.",
      path: "/docs/acc/introduction/overview",
      solution: "acc",
      categoryOrder: ["introduction"],
    },
    {
      title: "Process Discovery Accelerator",
      description: "PDA empowers automation consultants to quickly build business process models from client data.",
      path: "/docs/pda/introduction/overview",
      solution: "pda",
      categoryOrder: ["introduction"],
    },
    {
      title: "IBM Automation with Watson",
      description: "Enterprise Intelligent Automation Solutions",
      path: "/docs/iaw/introduction/overview",
      solution: "iaw",
      categoryOrder: ["introduction"],
    },
    {
      title: "IBM Services Engineering",
      description:
        "Standards, guidance, and best-practices to help projects managed and developed by the IBM Services Engineering teams.",
      path: "/docs/ise/standards/overview",
      solution: "ise",
      categoryOrder: ["standards"],
    },
  ],
  docsQuickLinks: [
    {
      text: "Getting Started",
      path: "/docs/docs/boomerang-flow/introduction/overview",
    },
    {
      text: "Tutorials",
      path: "/docs/docs/boomerang-flow/tutorials/git-hub-issues-bot",
    },
    {
      text: "Installing",
      path: "/docs/docs/boomerang-flow/installing/pre-requisites",
    },
  ],
};

module.exports = config;
