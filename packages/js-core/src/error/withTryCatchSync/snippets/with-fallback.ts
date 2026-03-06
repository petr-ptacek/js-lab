import { withTryCatchSync } from "@petr-ptacek/js-core";

// with fallback and error mapping
const result = withTryCatchSync(
  () => {
    const config = JSON.parse(configString);
    validateConfig(config);
    return config;
  },
  {
    fallback: { theme: "default", language: "en" },
    onSuccess: (_config) => {
      console.log("Configuration loaded successfully");
    },
    onError: (error) => {
      console.error("Using default config due to error:", error);
      // Could send to error tracking service
    },
    mapError: (e) => {
      if (e instanceof SyntaxError) {
        return { type: "PARSE_ERROR", message: "Invalid JSON format" };
      }
      if (e instanceof ValidationError) {
        return { type: "VALIDATION_ERROR", message: e.message };
      }
      return { type: "UNKNOWN_ERROR", message: String(e) };
    }
  }
);

// Result always has data due to fallback
console.log("Using config:", result.data);

if (!result.ok) {
  console.log("Fallback was used due to:", result.error);
}

// Helper functions
const configString = '{"theme": "dark", "language": "cs"}';

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateConfig(config: any) {
  if (!config.theme || !config.language) {
    throw new ValidationError("Missing required config fields");
  }
}
