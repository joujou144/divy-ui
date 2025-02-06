import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
    // "../lib/components/**/*.mdx",
    "../lib/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: [
          { find: "@/lib", replacement: resolve(__dirname, "./lib") },
          { find: "divy-ui", replacement: resolve(__dirname, "./lib") },
        ],
      },
      // plugins: [tsconfigPaths()],
    });
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
