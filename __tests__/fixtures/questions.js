const questionsFixture = [
  {
    variable_name: "patronType",
    multiple_choice_options: [
      "recu6xP62BL9yFbWN",
      "recuWkVDSEWc1K0eU",
      "rec2pB1RcV3BvyjPX"
    ],
    display_text_english: "My selection:",
    display_text_french: "Ma sélection:",
    "question display logic": ["recn0zobKUhFIowAh", "rec99OzU3gXrs66zH"],
    id: "recwwXPBszQacaMsb"
  },
  {
    variable_name: "serviceType",
    multiple_choice_options: [
      "rec6sKyG0dMJ7HLhY",
      "recIMgfjrCozH9eVW",
      "rec3hFX4SlnBMPl7W"
    ],
    display_text_english: "Service type:",
    display_text_french: "Type de service:",
    "question display logic": ["reczEVuK0ipZkAIec"],
    "question display logic 2": ["rec99OzU3gXrs66zH"],
    id: "recd9vxcm3gb3jkLE"
  },
  {
    variable_name: "statusAndVitals",
    multiple_choice_options: [
      "recM3T55J3Xf1qP16",
      "rec3vCJImDFrRIaFl",
      "recDW9csGX2ekiwXb"
    ],
    display_text_english: "Veteran Service status:",
    display_text_french: "Statut du membre:",
    note:
      "note: this table structure doesn't quite work because it just shows the question if the user's answer to a previous question is in the xEquals column. This doesn't allow the logic: \"if service-person and WSV, don't show the statusAndVitals question\".",
    "question display logic 2": ["rec99OzU3gXrs66zH"],
    id: "recUrZvFSfHUMzii7"
  },
  {
    variable_name: "serviceHealthIssue",
    multiple_choice_options: ["recxVaqj0O8BPKyeD", "recC0Rsw47ySCM1sS"],
    display_text_english: "Is there a service-related health issue?",
    display_text_french: "A-t-il un problème de santé lié au service?",
    "question display logic 2": ["rec99OzU3gXrs66zH"],
    id: "reccsWjclog8m3Od1"
  }
];

export default questionsFixture;
