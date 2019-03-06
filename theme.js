let theme = {
  fontFamilySerif: "Georgia",
  fontFamilySansSerif: "Montserrat",
  marginTop: "25px", //used in place of theme.spacing.unit *3
  unit: "8px",
  cardPadding: "35px",
  cardPaddingMobile: "19px",
  boxShadowMui:
    "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
  max: {
    mobile: "399.5px",
    xs: "424.5px",
    sm: "767.5px",
    md: "999.5px",
    lg: "1919.5px"
  },
  min: {
    xs: "425px",
    sm: "768px",
    md: "1000px",
    lg: "1920px"
  },
  colour: {
    blackish: "#3d3d3d",
    paleGrey: "#eaebed",
    paleGreyTwo: "#f4f7f9",
    warmGrey: "#979797",
    brownishGrey: "#646464",
    paleGreyishBrown: "#f8f8f8",
    greyishBrownTwo: "#505050",
    greyishBrown: "#2f3437",
    slateGrey: "#656972",
    cerulean: "#006cc9",
    darkGreyBlue: "#284162",
    paleBlue: "#e3f2ff",
    fernGreen: "#39824d",
    darkGreen: "#295f38",
    tornadoRed: "#ea4335",
    red2: "#d0021b",
    govukYellow: "#FFBF47",
    white: "#ffffff",
    cardGrey: "#f3f3f3",
    black: "#000000",
    alertYellow: "#fbb830",
    lightYellow: "#f9f4d3",
    alphaPink: "#d42dc9",
    betaBlue: "#634f70",
    alphaBlue: "#345075",
    salmon: "#ff6961",
    blueGrey: "#838d9b",
    paleBlueGrey: "#f1f7fc",
    darkBlueGrey: "#d8dee2",
    lineGrey: "#dfdfdf",
    tea: "#57c684",
    charcoalGrey: "#31353a",
    navy: "#434458",
    duckEggBlue: "#dbe3e5",
    darkPaleGrey: "#d5e2e9",
    blueish: "#f6f9fa",
    blackBlue: "#2f2f42",
    blackish2: "#2e2e40"
  }
};

theme.colour.textColour = theme.colour.blackish;
theme.colour.focusColour = theme.colour.govukYellow;
theme.colour.linkColour = theme.colour.cerulean;
theme.colour.linkHoverColour = theme.colour.cerulean;
theme.colour.boxBorderColour = theme.colour.darkPaleGrey;
theme.colour.bannerColour = theme.colour.blackish2;

export const globalTheme = { ...theme };
