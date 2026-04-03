import type { ChangelogFunctions } from "@changesets/types";

const changelog: ChangelogFunctions = {
  async getReleaseLine(changeset, type) {
    const summary = normalize(changeset.summary);

    return `- ${summary}`;
  },

  async getDependencyReleaseLine() {
    return "";
  },
};

function normalize(text: string): string {
  const trimmed = text.trim();

  // Capitalize first letter
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export default changelog;
