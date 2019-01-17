import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize(
    [
      {
        trackingId: process.env.GA_UA,
        gaOptions: { name: "tracker_1", siteSpeedSampleRate: 100 } // This will send 100% of hits to Google Analytics. By default only 1% are sent.
      },
      {
        trackingId: process.env.GA_UA_CDS,
        gaOptions: { name: "tracker_2", siteSpeedSampleRate: 100 }
      }
    ]
    //, { debug: true }
  );
  ReactGA.set({ anonymizeIp: true }, ["tracker_1"]);
  ReactGA.set({ anonymizeIp: true }, ["tracker_2"]);
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname }, ["tracker_1"]);
  ReactGA.pageview(window.location.pathname, ["tracker_1"]);
  ReactGA.set({ page: window.location.pathname }, ["tracker_2"]);
  ReactGA.pageview(window.location.pathname, ["tracker_2"]);
};

export const logEvent = (category = "", action = "", label = "") => {
  if (category && action) {
    ReactGA.event({ category, action, label }, ["tracker_1"]);
    ReactGA.event({ category, action, label }, ["tracker_2"]);
  }
};

export const logException = (description = "", fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal }, ["tracker_1"]);
    ReactGA.exception({ description, fatal }, ["tracker_2"]);
  }
};
