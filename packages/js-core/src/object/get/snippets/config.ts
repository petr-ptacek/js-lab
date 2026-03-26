import { get } from "@petr-ptacek/js-core";

const config = {
  server: {
    port: 3000,
    host: "localhost",
    ssl: true,
    database: {
      host: "db.example.com",
      credentials: {
        username: "admin",
        password: "secret123",
      },
    },
  },
};

// Access configuration values with sensible defaults
const port = get(config, "server.port", 8080);
const host = get(config, "server.host", "0.0.0.0");
const sslEnabled = get(config, "server.ssl", false);

// Access deeply nested configuration
const dbHost = get(config, "server.database.host", "localhost");
const dbUser = get(config, "server.database.credentials.username", "user");

console.log({
  port,
  host,
  sslEnabled,
  dbHost,
  dbUser,
});
