const config = {
  linksConfig: [
    {
      title: "Quick links",
      links: [
        {
          title: "Dogs",
          path: "/docs/dogs/anatomy/why-four-paws",
        },
        {
          title: "Pandas",
          path: "/docs/pandas/dragonwarrior/big-yin-yang",
        },
      ],
    },
    {
      title: "Discover our Animals",
      links: [
        {
          title: "Koalas",
          description: "Climbing trees and eating leaves",
          path: "/docs/dogs/speaking/woof-woof",
          image: "cicd",
        },
        {
          title: "Fishes",
          description: "Blub blub",
          path: "/docs/dogs/anatomy/so-much-hair",
          image: "flow",
        },
        {
          title: "Waves",
          description: "Where fishes hide",
          path: "/docs/pandas/dragonwarrior/po",
          image: "automation-control-center",
        },
        {
          title: "Blue Lines",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          path: "/docs/pandas/kawaii/why-so-cute",
          image: "process-delivery-accelerator",
        },
        {
          title: "Watson",
          description: "Enterprise Intelligent Automation Solutions",
          path: "/docs/dogs/anatomy/why-four-paws",
          image: "watson",
        },
      ],
    },
    {
      title: "External links",
      links: [
        {
          title: "External",
          path: "https://www.google.com",
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
