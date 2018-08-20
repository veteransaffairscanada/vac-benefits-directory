const eligibilityPathsFixture = [
  {
    patronType: "service-person",
    serviceType: "CAF",
    statusAndVitals: "na",
    benefits: ["0"]
  },
  {
    patronType: "service-person",
    statusAndVitals: "na",
    serviceType: "RCMP",
    benefits: ["1"]
  },
  {
    patronType: "service-person",
    statusAndVitals: "deceased",
    serviceType: "WSV (WWII or Korea)",
    benefits: ["1"]
  },
  {
    patronType: "service-person",
    statusAndVitals: "stillServing",
    serviceType: "WSV (WWII or Korea)",
    benefits: ["1"]
  }
];

export default eligibilityPathsFixture;
