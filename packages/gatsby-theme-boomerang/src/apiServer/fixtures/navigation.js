export default {
  navigation: [
    {
      name: "Launchpad",
      url: "https://launch.boomerangplatform.net/launchpad",
    },
    { name: "Catalog", url: "https://launch.boomerangplatform.net/catalog" },
    { name: "Status", url: "https://launch.boomerangplatform.net/status" },
    { name: "Docs", url: "https://launch.boomerangplatform.net/docs" },
    { name: "Admin", url: "https://launch.boomerangplatform.net/admin" },
  ],
  features: {
    "notifications.enabled": false,
  },
  platform: {
    version: "7.1.0",
    name: "Boomerang Core",
    signOutUrl: "https://launch.boomerangplatform.net/oauth/sign_out?rd=/oauth/sign_out",
    platformName: "Essentials@IBM",
    displayLogo: false,
    privateTeams: false,
    sendMail: true,
  },
};
