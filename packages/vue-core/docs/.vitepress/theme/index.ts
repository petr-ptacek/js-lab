import DefaultTheme from "vitepress/theme";
import type { App } from "vue";
import ApiBrowser from "../components/ApiBrowser.vue";
import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("ApiBrowser", ApiBrowser);
  },
};
