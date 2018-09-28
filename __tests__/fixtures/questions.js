const questionsFixture = [
  {
    variable_name: "patronType",
    multiple_choice_options: ["service-person", "family", "organization"],
    display_text_english: "My selection:",
    display_text_french: "Ma sélection:",
    guided_experience_english: "Select who will be receiving the benefits.",
    guided_experience_french: "Montre moi des avantages pour:",
    id: "recwwXPBszQacaMsb"
  },
  {
    variable_name: "serviceType",
    multiple_choice_options: ["CAF", "RCMP", "WSV (WWII or Korea)"],
    display_text_english: "Service type:",
    display_text_french: "Type de service:",
    guided_experience_english: "Select the service type.",
    guided_experience_french: "Sélectionnez le type de service.",
    id: "recd9vxcm3gb3jkLE"
  },
  {
    variable_name: "statusAndVitals",
    multiple_choice_options: ["stillServing", "releasedAlive", "deceased"],
    display_text_english: "Veteran Service status:",
    display_text_french: "Statut du membre:",
    guided_experience_english: "Select the service status.",
    guided_experience_french: "Sélectionnez  le statut du membre.",
    id: "recUrZvFSfHUMzii7"
  },
  {
    variable_name: "serviceHealthIssue",
    multiple_choice_options: ["true", "false"],
    display_text_english: "Is there a service-related health issue?",
    display_text_french: "A-t-il un problème de santé lié au service?",
    guided_experience_english: "Is there a service-related health issue?",
    guided_experience_french: "A-t-il un problème de santé lié au service?",
    id: "reccsWjclog8m3Od1"
  },
  {
    variable_name: "needs",
    display_text_english: "Filter by category",
    display_text_french: "Filtrer par sujet",
    guided_experience_english:
      "Select the categories of benefits you want to see.",
    guided_experience_french:
      "Sélectionnez les types d'avantages que vous voulez consulter. ",
    id: "recritlpywwyoGLtm",
    "question display logic 2": ["rec99OzU3gXrs66zH"]
  }
];

export default questionsFixture;
