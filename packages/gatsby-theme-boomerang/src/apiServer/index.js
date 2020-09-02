import { Server, Serializer } from "miragejs";
// eslint-disable-next-line import/no-extraneous-dependencies
import { inflections } from "inflected";
import { serviceUrl } from "Config/servicesConfig";
import * as fixtures from "./fixtures";

export function startApiServer({ environment = "test", timing = 0 } = {}) {
  inflections("en", function (inflect) {
    // Prevent pluralization bc our apis are weird
    inflect.irregular("catalog", "catalog");
  });

  return new Server({
    environment,
    // Load in mock data
    fixtures,
    // Return the data as is, don't add a root key
    serializers: {
      application: Serializer.extend({
        root: false,
        embed: true,
      }),
      catalog: Serializer.extend({
        include: ["size"],
      }),
    },

    routes() {
      // Control how long the responses take to resolve
      this.timing = timing;

      // Allow unhandled requests on the current domain to pass through
      this.passthrough();

      this.get("/info", () => []);

      /**
       * Simple GET of static data
       */
      this.get(serviceUrl.getUserProfile(), (schema) => schema.db.profile[0]);

      this.get(serviceUrl.getNavigation(), (schema) => schema.db.navigation[0]);
    },
  });
}
