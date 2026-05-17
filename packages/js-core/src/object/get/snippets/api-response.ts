import { get } from "@petr-ptacek/js-core";

const apiResponse = {
  data: {
    user: {
      id: 1,
      profile: {
        email: "alice@example.com",
        preferences: { theme: "dark" },
      },
    },
    meta: {
      pagination: {
        total: 42,
        page: 1,
      },
    },
  },
};

// Safely access nested API data
const userEmail = get(apiResponse, "data.user.profile.email");
console.log(userEmail); // "alice@example.com"

const userTheme = get(apiResponse, "data.user.profile.preferences.theme", "light");
console.log(userTheme); // "dark"

// Access meta information with defaults
const total = get(apiResponse, "data.meta.pagination.total", 0);
console.log(total); // 42
