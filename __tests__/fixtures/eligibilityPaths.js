const eligibilityPathsFixture = [
  {
    id: "ep_0",
    requirements: ["patronType: p1"],
    benefits: ["benefit_0", "benefit_2"],
    patronType: "service-person"
  },
  {
    id: "ep_1",
    requirements: ["patronType: p2"],
    benefits: ["benefit_2"],
    patronType: "family"
  },
  {
    id: "ep_2",
    requirements: ["patronType: p3"],
    benefits: ["benefit_3", "benefit_1"],
    patronType: "organization"
  }
];

export default eligibilityPathsFixture;
