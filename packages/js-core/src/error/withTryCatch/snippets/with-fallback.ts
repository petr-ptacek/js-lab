import { withTryCatch } from "@petr-ptacek/js-core";

// with fallback and callbacks
const result = await withTryCatch(
  async () => {
    const data = await fetchUserProfile();
    return data;
  },
  {
    fallback: () => ({ name: "Anonymous", id: "unknown" }),
    onSuccess: (_data) => {
      console.log("Profile loaded successfully");
    },
    onError: (error) => {
      console.error("Failed to load profile:", error);
      // Could send to error tracking service
    },
    mapError: (e) => {
      if (e instanceof Error) {
        return { message: e.message, code: "FETCH_ERROR" };
      }
      return { message: "Unknown error", code: "UNKNOWN" };
    },
  },
);

// Result always has data due to fallback
console.log("User:", result.data);

if (!result.ok) {
  console.log("Using fallback data due to error:", result.error);
}

function fetchUserProfile() {
  return fetch("/api/user/profile").then((r) => r.json());
}
