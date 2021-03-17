const config = [
  {
    title: "Quick links",
    links: [
      {
        title: "Getting Started at IBM",
        description: "",
        path: "/docs/boomerang/introduction/getting-started",
      },
      {
        title: "What’s new with IBM Services Essentials",
        description: "",
        path: "/docs/boomerang/introduction/whats-new",
      },
      {
        title: "Check our frequently asked questions",
        description: "",
        path: "/docs/boomerang/introduction/frequently-asked-questions",
      },
    ],
  },
  {
    title: "Discover our Platform",
    links: [
      {
        title: "Introduction",
        description: "Overview, architecture, and general information for the IBM Services Essentials platform. This description can go onto 4 lines if the title is 1 line blabla bla bla blablabla bla",
        path: "Every one of these cards must have meaningful text that adds to the context.",
      },
      {
        title: "Architecture",
        description: "Every one of these cards must have meaningful text that adds to the context.",
        path: "/docs/boomerang/introduction/whats-new",
      },
      {
        title: "How to…",
        description: "Every one of these cards must have meaningful text.",
        path: "/docs/boomerang/introduction/frequently-asked-questions",
      },
      {
        title: "Administration [and sample of two line title]",
        description: "This description can go onto 3 lines (if the title is 2 lines). Here it is, on three lines of description text and then bla bla blablablabla blabla bla",
        path: "/docs/boomerang/introduction/whats-new",
      },
      {
        title: "Extending",
        description: "Try not to make it only one line.",
        path: "/docs/boomerang/introduction/frequently-asked-questions",
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
        path: "/docs/boomerang-cicd/introduction/overview",
        solution: "boomerang-cicd",
        categoryOrder: ["introduction", "architecture", "getting-to-know", "how-to-guide", "how-to-guide-for-modes"],
        image: "cicd",
      },
      {
        title: "Boomerang Flow",
        description: "Cloud native workflow orchestration.",
        path: "/docs/boomerang-flow/introduction/overview",
        solution: "boomerang-flow",
        categoryOrder: ["introduction", "architecture", "getting-to-know", "installing"],
        image: "flow",
      },
      {
        title: "IBM Automation Platform",
        description:
          "A fully integrated enterprise-ready ecosystem designed to accelerate the development, implementation, governance, and operations of intelligent workflow and automated environments.",
        path: "/docs/iap/introduction/overview",
        solution: "iap",
        categoryOrder: ["introduction"],
        image: "automation-platform",
      },
      {
        title: "IBM Automation Control Center",
        description:
          "Allows business managers to monitor their hybrid workforces and automated business processes and understand current workloads and performance.",
        path: "/docs/acc/introduction/overview",
        solution: "acc",
        categoryOrder: ["introduction"],
        image: "automation-control-center",
      },
      {
        title: "Process Discovery Accelerator",
        description: "PDA empowers automation consultants to quickly build business process models from client data.",
        path: "/docs/pda/introduction/overview",
        solution: "pda",
        categoryOrder: ["introduction"],
        image: "process-delivery-accelerator",
      },
      {
        title: "IBM Automation with Watson",
        description: "Enterprise Intelligent Automation Solutions",
        path: "/docs/iaw/introduction/overview",
        solution: "iaw",
        categoryOrder: ["introduction"],
        image: "watson",
      },
    ],
  },
  {
    title: "Standards and playbooks",
    links: [
      {
        title: "This is an external link with the launch icon",
        description: "",
        path: "https://www.google.com",
      },
      {
        title: "IBM Services Engineering",
        description: "",
        path: "",
      },
      {
        title: "This is an internal link with the arrow icon, and multiple lines of text",
        description: "",
        path: "",
      },
    ],
  },
];

// const config = {
//   platform: [
//     {
//       title: "IBM Services Essentials",
//       description: "Overview, architecture, and general information for the IBM Services Essentials platform.",
//       path: "/docs/boomerang/introduction/overview",
//       solution: "boomerang",
//       categoryOrder: ["introduction", "architecture"],
//     },
//     {
//       title: "IBM Services Essentials Core",
//       description: "Core capabilities and common services for a centralized, and secure platform.",
//       path: "/docs/essentials-core/introduction/overview",
//       solution: "essentials-core",
//       categoryOrder: ["introduction", "architecture", "how-to-guide", "how-to-admin", "installing", "extending"],
//     },
//     {
//       title: "Boomerang CICD",
//       description:
//         "Whether you're new to CICD or a seasoned veteran, this contains the guidance for Components, Pipelines, Workflows, Insights, Scorecard, Lib, and Policies.",
//       path: "/docs/boomerang-cicd/introduction/overview",
//       solution: "boomerang-cicd",
//       categoryOrder: ["introduction", "architecture", "getting-to-know", "how-to-guide", "how-to-guide-for-modes"],
//     },
//     {
//       title: "Boomerang Flow",
//       description: "Cloud native workflow orchestration.",
//       path: "/docs/boomerang-flow/introduction/overview",
//       solution: "boomerang-flow",
//       categoryOrder: ["introduction", "architecture", "getting-to-know", "installing"],
//     },
//     {
//       title: "IBM Automation Platform",
//       description:
//         "A fully integrated enterprise-ready ecosystem designed to accelerate the development, implementation, governance, and operations of intelligent workflow and automated environments.",
//       path: "/docs/iap/introduction/overview",
//       solution: "iap",
//       categoryOrder: ["introduction"],
//     },
//     {
//       title: "Automation Control Center",
//       description:
//         "Allows business managers to monitor their hybrid workforces and automated business processes and understand current workloads and performance.",
//       path: "/docs/acc/introduction/overview",
//       solution: "acc",
//       categoryOrder: ["introduction"],
//     },
//     {
//       title: "Process Discovery Accelerator",
//       description: "PDA empowers automation consultants to quickly build business process models from client data.",
//       path: "/docs/pda/introduction/overview",
//       solution: "pda",
//       categoryOrder: ["introduction"],
//     },
//     {
//       title: "IBM Automation with Watson",
//       description: "Enterprise Intelligent Automation Solutions",
//       path: "/docs/iaw/introduction/overview",
//       solution: "iaw",
//       categoryOrder: ["introduction"],
//     },
//     {
//       title: "IBM Services Engineering",
//       description:
//         "Standards, guidance, and best-practices to help projects managed and developed by the IBM Services Engineering teams.",
//       path: "/docs/ise/standards/overview",
//       solution: "ise",
//       categoryOrder: ["standards"],
//     },
//   ],
//   solutions: [],
//   quickLinks: [
//     {
//       title: "Getting Started at IBM",
//       text: "Read the introduction",
//       path: "/docs/boomerang/introduction/getting-started",
//     },
//     {
//       title: "What’s new with IBM Services Essentials",
//       text: "View latest release notes",
//       path: "/docs/boomerang/introduction/whats-new",
//     },
//     {
//       title: "Check our frequently asked questions",
//       text: "View Platform FAQ",
//       path: "/docs/boomerang/introduction/frequently-asked-questions",
//     },
//   ],
// };

module.exports = config;
