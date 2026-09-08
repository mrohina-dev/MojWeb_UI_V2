// .storybook/preview.ts
import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // اعمال صفت‌های RTL به ریشه داستان‌های استوری‌بوک
  decorators: [
    (Story) => (
      <div dir="rtl" className="font-sans antialiased text-right">
        <Story />
      </div>
    ),
  ],
};

export default preview;
