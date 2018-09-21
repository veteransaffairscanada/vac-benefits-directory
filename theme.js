const theme = {
  fontFamily: "Merriweather",
  maxWidth: "1200px",
  margin: "0 auto",
  paddingLeft: "16px",
  paddingRight: "16px",
  marginTop: "25px", //used in place of theme.spacing.unit *3
  unit: "8px",
  max: {
    mobile: "399.5px",
    xs: "599.5px",
    sm: "959.5px",
    md: "1279.5px",
    lg: "1919.5px"
  },
  min: {
    xs: "600px",
    sm: "960px",
    md: "1280px",
    lg: "1920px"
  },
  colour: {
    paleGrey: "#eaebed",
    warmGrey: "#979797",
    brownishGrey: "#646464",
    greyishBrownTwo: "#505050",
    greyishBrown: "#434343",
    cerulean: "#006cc9",
    darkGreyBlue: "#284162",
    fernGreen: "#39824d",
    darkGreen: "#295f38",
    tornadoRed: "#ea4335",
    govukYellow: "#FFBF47",
    white: "#ffffff"
  }
};

export const globalTheme = { ...theme };
