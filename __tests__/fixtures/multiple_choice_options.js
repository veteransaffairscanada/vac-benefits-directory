const multipleChoiceOptionsFixture = [
  {
    variable_name: "service-person",
    display_text_english: "Veterans or serving members",
    display_text_french: "Vétérans ou membre actifs",
    linked_question: ["patronType"],
    "questions 2": "serviceType, statusAndVitals, serviceHealthIssue",
    "question display logic": ["recn0zobKUhFIowAh"],
    id: "recu6xP62BL9yFbWN",
    ge_breadcrumb_english: "Veterans or serving members",
    ge_breadcrumb_french: "Vétérans ou membre actifs"
  },
  {
    variable_name: "family",
    display_text_english: "Family members",
    display_text_french: "Membres de la famille",
    linked_question: ["patronType"],
    "questions 2": "serviceType, statusAndVitals, serviceHealthIssue",
    id: "recuWkVDSEWc1K0eU",
    ge_breadcrumb_english: "en breadcrumb",
    ge_breadcrumb_french: "fr breadcrumb"
  },
  {
    variable_name: "organization",
    display_text_english: "Organizations",
    display_text_french: "Organisations",
    linked_question: ["patronType"],
    "question display logic": ["rec99OzU3gXrs66zH"],
    id: "rec2pB1RcV3BvyjPX",
    ge_breadcrumb_english: "en breadcrumb",
    ge_breadcrumb_french: "fr breadcrumb"
  },
  {
    variable_name: "CAF",
    display_text_english: "Canadian Armed Forces",
    display_text_french: "Forces Armées Canadiennes",
    linked_question: ["serviceType"],
    "questions 3": "statusAndVitals, serviceHealthIssue",
    id: "rec6sKyG0dMJ7HLhY",
    ge_breadcrumb_english: "en breadcrumb",
    ge_breadcrumb_french: "fr breadcrumb"
  },
  {
    variable_name: "RCMP",
    display_text_english: "Royal Canadian Mounted Police",
    display_text_french: "Gendarmerie royale du Canada",
    linked_question: ["serviceType"],
    "questions 3": "statusAndVitals, serviceHealthIssue",
    id: "recIMgfjrCozH9eVW",
    ge_breadcrumb_english: "en breadcrumb",
    ge_breadcrumb_french: "fr breadcrumb"
  },
  {
    variable_name: "WSV (WWII or Korea)",
    display_text_english: "WWII or Korean War Veterans",
    display_text_french:
      "Vétérans de la Seconde Guerre mondiale ou la guerre de Corée",
    linked_question: ["serviceType"],
    "questions 3": "statusAndVitals, serviceHealthIssue",
    "question display logic": ["reczEVuK0ipZkAIec"],
    id: "rec3hFX4SlnBMPl7W",
    ge_breadcrumb_english: "WWII or Korean War Veterans",
    ge_breadcrumb_french:
      "Vétérans de la Seconde Guerre mondiale ou la guerre de Corée"
  },
  {
    variable_name: "stillServing",
    display_text_english: "Still-serving",
    display_text_french: "En service actif",
    linked_question: ["statusAndVitals"],
    "questions 4": "serviceHealthIssue",
    "question display logic 2": ["reczEVuK0ipZkAIec"],
    id: "mco:stillServing",
    ge_breadcrumb_english: "Still-serving",
    ge_breadcrumb_french: "En service actif"
  },
  {
    variable_name: "releasedAlive",
    display_text_english: "Released",
    display_text_french: "Libéré",
    linked_question: ["statusAndVitals"],
    "questions 4": "serviceHealthIssue",
    id: "mco:releasedAlive",
    ge_breadcrumb_english: "Released",
    ge_breadcrumb_french: "Libéré"
  },
  {
    variable_name: "deceased",
    display_text_english: "Deceased",
    display_text_french: "Décédé",
    linked_question: ["statusAndVitals"],
    "questions 4": "serviceHealthIssue",
    "question display logic 2": ["recn0zobKUhFIowAh"],
    id: "mco:deceased",
    ge_breadcrumb_english: "en breadcrumb",
    ge_breadcrumb_french: "fr breadcrumb"
  },
  {
    variable_name: "true",
    display_text_english: "Yes",
    display_text_french: "Oui",
    linked_question: ["serviceHealthIssue"],
    id: "recxVaqj0O8BPKyeD",
    ge_breadcrumb_english: "Has service-related health issue",
    ge_breadcrumb_french: "A un problème de santé lié au service"
  },
  {
    variable_name: "false",
    display_text_english: "No",
    display_text_french: "Non",
    linked_question: ["serviceHealthIssue"],
    id: "recC0Rsw47ySCM1sS",
    ge_breadcrumb_english: "No service-related health issue",
    ge_breadcrumb_french: "A un problème de santé lié au service"
  }
];

export default multipleChoiceOptionsFixture;
