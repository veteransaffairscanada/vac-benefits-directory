const questionDisplayLogicFixture = [
  {
    question: ["patronType"],
    "has value": ["service-person"],
    "exclude options": ["deceased"],
    id: "recn0zobKUhFIowAh"
  },
  {
    question: ["patronType"],
    "has value": ["organization"],
    "exclude questions": [
      "serviceType",
      "statusAndVitals",
      "serviceHealthIssue"
    ],
    id: "rec99OzU3gXrs66zH"
  },
  {
    question: ["serviceType"],
    "has value": ["WSV (WWII or Korea)"],
    "exclude options": ["stillServing"],
    id: "reczEVuK0ipZkAIec"
  }
];

export default questionDisplayLogicFixture;
