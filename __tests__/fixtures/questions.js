const questionsFixture = [
  {
    variable_name: "patronType",
    multiple_choice_options: ["service-person", "family", "organization"],
    display_text_english: "My selection:",
    display_text_french: "Ma sélection:",
    id: "recwwXPBszQacaMsb"
  },
  {
    variable_name: "serviceType",
    multiple_choice_options: ["CAF", "RCMP", "WSV (WWII or Korea)"],
    display_text_english: "Service type:",
    display_text_french: "Type de service:",
    id: "recd9vxcm3gb3jkLE"
  },
  {
    variable_name: "statusAndVitals",
    multiple_choice_options: ["deceased", "releasedAlive", "stillServing"],
    display_text_english: "Veteran Service status:",
    display_text_french: "Statut du membre:",
    note:
      "note: this table structure doesn't quite work because it just shows the question if the user's answer to a previous question is in the xEquals column. This doesn't allow the logic: \"if service-person and WSV, don't show the statusAndVitals question\".",
    id: "recUrZvFSfHUMzii7"
  },
  {
    variable_name: "serviceHealthIssue",
    multiple_choice_options: ["false", "true"],
    display_text_english: "Is there a service-related health issue?",
    display_text_french: "A-t-il un problème de santé lié au service?",
    id: "reccsWjclog8m3Od1"
  }
];

export default questionsFixture;
