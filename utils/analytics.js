import ReactGA from "react-ga";

export const initGA = () => {
  console.log("GA_UA", process.env.GA_UA);
  console.log("GA_UA_CDS", process.env.GA_UA_CDS);

  ReactGA.initialize(
    [
      {
        trackingId: process.env.GA_UA,
        gaOptions: { name: "tracker_1", siteSpeedSampleRate: 100 }
      },
      {
        trackingId: process.env.GA_UA_CDS,
        gaOptions: { name: "tracker_2", siteSpeedSampleRate: 100 }
      }
    ],
    { debug: true }
  );
  ReactGA.set({ anonymizeIp: true });
};

export const logPageView = () => {
  ga("tracker_1.set", "page", window.location.pathname);
  ga("tracker_1.send", "pageview", window.location.pathname);
  ga("tracker_2.set", "page", window.location.pathname);
  ga("tracker_2.send", "pageview", window.location.pathname);
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
