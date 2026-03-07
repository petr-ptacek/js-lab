import { has } from "@petr-ptacek/js-core";

const config = {
  server: {
    host: "localhost",
    port: 3000,
    ssl: false,
    auth: null,
    timeout: undefined,
  },
  features: ["auth", "logging"],
};

// Check if top-level key exists
has(config, "server");
// → true

// Check if nested key exists
has(config, "server.host");
// → true

// Falsy values — key exists, so true
has(config, "server.ssl");
// → true  (key present, value false)

has(config, "server.auth");
// → true  (key present, value null)

// Key explicitly set to undefined — key still exists
has(config, "server.timeout");
// → true  (key present, value undefined)

// Array element access
has(config, "features.0");
// → true

// Key not present on the object at all
has(config, "server.retries" as any);
// → false

