import { extendTheme } from "@chakra-ui/react";
import { League_Spartan } from "next/font/google";

import { Button } from "./components/button";
import { Input, NumberInput } from "./components/input";
import { Select } from "./components/select";

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
  shadows: {
    outline: "0 0 0 3px rgba(26, 32, 44, 0.6)",
  },
  config: {
    cssVarPrefix: "ia",
  },
  components: {
    Button,
    Input,
    NumberInput,
    Select,
  },
  breakpoints,
});

export default theme;
