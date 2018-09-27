const questionDisplayLogicFixture = [
  {
    question: ["patronType"],
    "has value": ["service-person"],
    "exclude options": ["deceased"],
    Name: "patronType = service-person",
    id: "recn0zobKUhFIowAh"
  },
  {
    question: ["patronType"],
    "has value": ["organization"],
    "exclude questions": [
      "serviceType",
      "statusAndVitals",
      "serviceHealthIssue",
      "needs"
    ],
    Name: "patronType = organization",
    id: "rec99OzU3gXrs66zH"
  },
  {
    question: ["serviceType"],
    "has value": ["WSV (WWII or Korea)"],
    "exclude options": ["stillServing"],
    Name: "serviceType = WSV (WWII or Korea)",
    id: "reczEVuK0ipZkAIec"
  }
];

export default questionDisplayLogicFixture;
