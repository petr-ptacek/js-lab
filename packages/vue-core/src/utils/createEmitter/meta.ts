import type { Meta } from "../../_internal/meta";

export const meta: Meta = {
  id: "createEmitter",
  name: "createEmitter",
  kind: "utility",
  description:
    "Creates a Vue-aware event emitter that automatically removes registered handlers when the host component unmounts.",
  tags: ["event", "emitter", "lifecycle", "cleanup", "pubsub"],
  snippets: false,
  demo: false,
  since: "1.0.0",
};
