const config = {
  linksConfig: [
    {
      title: "Quick links",
      links: [
        {
          title: "Getting Started",
          path: "/essentials-core/introduction/getting-started",
        },
        {
          title: "What's New with IBM Services Essentials",
          path: "/essentials-core/introduction/whats-new",
        },
        {
          title: "Frequently Ask Questions",
          path: "/essentials-core/introduction/frequently-asked-questions",
        },
      ],
    },
    {
      title: "Discover our Platform",
      links: [
        {
          title: "Introduction",
          description:
            "Get to know IBM Services Essentials Core capabilities and common services for a centralized, and secure platform.",
          path: "/essentials-core/introduction/overview",
        },
        {
          title: "Architecture",
          description:
            "Provides the architecture of IBM Services Essentials Core and the patterns, technologies, and implementation.",
          path: "/essentials-core/architecture/overview",
        },
        {
          title: "How to Guide",
          description: "Familiarize yourself with the platform functionality and each of the major functions.",
          path: "/essentials-core/how-to-guide/launchpad",
        },
        {
          title: "Administration",
          description: "Deep dive into how to operator and run the platform, particularly your own instance.",
          path: "/essentials-core/how-to-admin/admin",
        },
        {
          title: "Extending",
          description: "Explore how to extend the platform through the Frameworks and APIs.",
          path: "/essentials-core/extending/getting-started",
        },
        {
          title: "Installing",
          description: "Learn what it takes, and how, to install your own instance.",
          path: "/essentials-core/extending/getting-started",
        },
      ],
    },
    {
      title: "Discover our Services",
      links: [
        {
          title: "Boomerang CICD",
          description:
            "Whether you're new to CICD or a seasoned veteran, this contains the guidance for Components, Pipelines, Workflows, Insights, Scorecard, Lib, and Policies.",
          path: "/boomerang-cicd/introduction/overview",
          image: "cicd",
        },
        {
          title: "Boomerang Flow",
          description: "Cloud native workflow orchestration.",
          path: "/boomerang-flow/introduction/overview",
          image: "flow",
        },
        {
          title: "Automation Control Center",
          description:
            "Allows business managers to monitor their hybrid workforces and automated business processes and understand current workloads and performance.",
          path: "/acc/introduction/overview",
          image: "automation-control-center",
        },
        {
          title: "Process Discovery Accelerator",
          description: "PDA empowers automation consultants to quickly build business process models from client data.",
          path: "/pda/introduction/overview",
          image: "process-delivery-accelerator",
        },
        {
          title: "IBM Automation with Watson",
          description: "Enterprise Intelligent Automation Solutions",
          path: "/iaw/introduction/overview",
          image: "watson",
        },
      ],
    },
    {
      title: "Standards and playbooks",
      links: [
        {
          title: "Standards",
          description:
            "Software engineering standards as used by the IBM Services Engineering in developing IBM Services Essentials and Services",
          path: "/ise/standards/overview",
        },
        {
          title: "Developer Playbook",
          description: "Assets, recommendations, and guidance for developers building for and using the platform",
          path: "/ise/development/playbook",
        },
      ],
    },
  ],
  solutionsConfig: [
    {
      title: "Essentials Core",
      solution: "essentials-core",
      categoryOrder: ["introduction", "architecture", "how-to-guide", "how-to-admin", "installing", "extending"],
    },
    {
      title: "Boomerang CICD",
      solution: "boomerang-cicd",
      categoryOrder: ["introduction", "architecture", "getting-to-know", "how-to-guide", "how-to-guide-for-modes"],
    },
    {
      title: "Boomerang Flow",
      solution: "boomerang-flow",
      categoryOrder: ["introduction", "architecture", "getting-to-know", "installing"],
    },
    {
      title: "Automation Control Center",
      solution: "acc",
      categoryOrder: ["introduction"],
    },
    {
      title: "Process Discovery Accelerator",
      solution: "pda",
      categoryOrder: ["introduction"],
    },
    {
      title: "IBM Automation with Watson",
      solution: "iaw",
      categoryOrder: ["introduction"],
    },
  ],
};

module.exports = config;
