import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'xs': '375px',
      },
      colors: {
        buttonColor: "#827AAF",
        hoverColor: "rgb(187, 159, 270)",
        semanticColor: "#CCCCCC",
        bgGrayColor: "#313338",
        rNavColor: "#2B2D31",
        lNavColor: "#1E1F22",
        myNavColor: "#232428",
        chatColor: "#2B2D31",
        chatInputColor: "#383A3F",
        channelInfoColor: "#232428",
        userInfoColor: "#232428",
        indigoColor: "#5749AB",
      },
    },
  },
  plugins: [],
};
export default config;
