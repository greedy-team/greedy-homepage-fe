import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "그리디 디자인 시스템",
    brandImage: "/greedy-wordmark.svg",
    brandTarget: "_self",
    colorPrimary: "#017356",
    colorSecondary: "#017356",
  }),
});
