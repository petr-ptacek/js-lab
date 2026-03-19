import { defineConfig } from "vitepress";

export default defineConfig({
  title: "JS Lab",
  description: "JavaScript libraries by Petr Ptáček",
  base: "/js-lab/",

  themeConfig: {
    nav: [
      { text: "js-core", link: "/js-core/" },
      // { text: "vue-core", link: "/vue-core/" },
      { text: "GitHub", link: "https://github.com/petr-ptacek/js-lab" },
    ],
  },
});
