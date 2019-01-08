import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize([
    { trackingId: process.env.GA_UA },
    { trackingId: process.env.GA_UA_CDS }
  ]);
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = "", action = "", label = "") => {
  if (category && action) {
    ReactGA.event({ category, action, label });
  }
};

export const logException = (description = "", fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
