import { extendTheme } from "@chakra-ui/react";
import { League_Spartan } from "next/font/google";

import { Button } from "./components/button";
import { Input, NumberInput } from "./components/input";

const fonts = League_Spartan({ subsets: ["latin"] });

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

const theme = extendTheme({
  fonts: {
    heading: fonts.style.fontFamily,
    body: fonts.style.fontFamily,
  },
  styles: {
    global: {
      "html, body": {
        height: "100%",
      },
      "#__next": {
        height: "100%",
      },
    },
  },
  config: {
    cssVarPrefix: "ia",
  },
  components: {
    Button,
    Input,
    NumberInput,
  },
  breakpoints,
});

export default theme;