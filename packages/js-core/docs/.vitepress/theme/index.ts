import DefaultTheme from "vitepress/theme";
import ApiBrowser from "../components/ApiBrowser.vue";
import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("ApiBrowser", ApiBrowser);
  },
};
