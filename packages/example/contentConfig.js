const config = {
  linksConfig: [
    {
      title: "Quick links",
      links: [
        {
          title: "Dogs",
          path: "/dogs/anatomy/why-four-paws",
        },
        {
          title: "Pandas",
          path: "/pandas/dragonwarrior/big-yin-yang",
        },
      ],
    },
    {
      title: "Discover our Animals",
      links: [
        {
          title: "Koalas",
          description: "Climbing trees and eating leaves",
          path: "/dogs/anatomy/why-four-paws",
          image: "cicd",
        },
        {
          title: "Fishes",
          description: "Blub blub",
          path: "/dogs/anatomy/why-four-paws",
          image: "flow",
        },
        {
          title: "Waves",
          description: "Where fishes hide",
          path: "/dogs/anatomy/why-four-paws",
          image: "automation-control-center",
        },
        {
          title: "Blue Lines",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          path: "/dogs/anatomy/why-four-paws",
          image: "process-delivery-accelerator",
        },
        {
          title: "Watson",
          description: "Enterprise Intelligent Automation Solutions",
          path: "/dogs/anatomy/why-four-paws",
          image: "watson",
        },
      ],
    },
  ],
  solutionsConfig: [
    {
      title: "Dogs",
      solution: "dogs",
      categoryOrder: ["speaking, anatomy"],
    },
    {
      title: "Pandas",
      solution: "pandas",
      categoryOrder: ["kawaii", "dragonwarrior"],
    },
  ],
  footerLinksConfig: [
    {
      link: "https://ibm.com/",
      title: "IBM.com",
      type: "website",
    },
    {
      link: "https://twitter.com/IBM/",
      title: "Follow IBM on Twitter",
      type: "twitter",
    },
    {
      link: "https://www.linkedin.com/company/ibm",
      title: "Connect with IBM on LinkedIn",
      type: "linkedin",
    },
    {
      link: "mailto:isesupp@us.ibm.com?subject=IBM Services Essentials",
      title: "isesupp@us.ibm.com",
      type: "email",
    },
  ],
};

module.exports = config;
