import { createTheme, Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    primaryAlpha: {
      main: string;
    };
    secondaryBackgroundColor: string;
    mediumGrey: string;
    lightGrey: string;
    darkerBackgroundColor: string;
    lightBackgroundColor: string;
    menuBackgroundColor: string;
    contentBackgroundColor: string;
    labelBackGroundColor: string;
  }
  interface ThemeOptions {
    primaryAlpha?: {
      main?: string;
    };
    secondaryBackgroundColor?: string;
    mediumGrey?: string;
    lightGrey?: string;
    darkerBackgroundColor?: string;
    lightBackgroundColor?: string;
    menuBackgroundColor?: string;
    contentBackgroundColor?: string;
    labelBackGroundColor?: string;
  }
}

const white = "#fff";
const mediumGrey = "#555";
const lightGrey = "#ffffff24";
const darkerBackgroundColor = "#0000006b";
const lightBackgroundColor = "#f3f3f385";
const menuBackgroundColor = "#2d6de2";
const contentBackgroundColor = "#eee";
const labelBackGroundColor = "#a7a1a185";

export const darkTheme: Theme = createTheme({
  palette: {
    primary: {
      main: "#051436",
      contrastText: white,
    },
    secondary: {
      main: "#d3691c",
      contrastText: white,
    },
    background: {
      default: "#99c2ff",
    },
  },
  primaryAlpha: {
    main: "#051436c7",
  },
  secondaryBackgroundColor: white,
  mediumGrey: mediumGrey,
  lightGrey: lightGrey,
  darkerBackgroundColor: darkerBackgroundColor,
  lightBackgroundColor: lightBackgroundColor,
  menuBackgroundColor: menuBackgroundColor,
  contentBackgroundColor: contentBackgroundColor,
  labelBackGroundColor: labelBackGroundColor,
});

export const lightTheme: Theme = createTheme({
  palette: {
    primary: {
      main: "#051436",
      contrastText: white,
    },
    secondary: {
      main: "#d3691c",
      contrastText: white,
    },
    background: {
      default: "#bbd3e7",
    },
  },
  primaryAlpha: {
    main: "#051436c7",
  },
  secondaryBackgroundColor: white,
  mediumGrey: mediumGrey,
  lightGrey: lightGrey,
  darkerBackgroundColor: darkerBackgroundColor,
  lightBackgroundColor: lightBackgroundColor,
  menuBackgroundColor: menuBackgroundColor,
  contentBackgroundColor: contentBackgroundColor,
  labelBackGroundColor: labelBackGroundColor,
});
