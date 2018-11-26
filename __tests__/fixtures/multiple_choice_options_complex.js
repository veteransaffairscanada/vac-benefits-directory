const multipleChoiceOptions = [
  {
    display_text_english: "Benefits for Veterans",
    display_text_french: "Services pour les vétérans",
    linked_question: ["patronType"],
    "question display logic": ["recn0zobKUhFIowAh", "recZjAnVF7NCwYo74"],
    questionClearLogic: ["recP2ZH4HWTMkutPu"],
    variable_name: "veteran",
    eligibilityPaths: [
      "recxsl5L3LLGIT9rt",
      "recU1DU5vDT8h3sOX",
      "rec8azbXzu0MLVs3y",
      "recGN6WlSHpAw3tt6",
      "recQerwEMBUU3TlRO",
      "recHYNXwAm2ncw4Ov",
      "recsOdDx7CWAftWIR",
      "rec55z5R3yz8JMv23",
      "recrvk509oay9Vqd2",
      "recj4U5sS1GYwJJjq"
    ],
    "key (DO NOT EDIT)": "veteran",
    id: "recu6xP62BL9yFbWN"
  },
  {
    display_text_english: "Benefits for currently serving members",
    display_text_french: "Services pour les membres en service actif",
    linked_question: ["patronType"],
    "question display logic": ["recZjAnVF7NCwYo74", "recdXDG6qy8fOltJr"],
    variable_name: "servingMember",
    eligibilityPaths: [
      "recxsl5L3LLGIT9rt",
      "recU1DU5vDT8h3sOX",
      "recHYNXwAm2ncw4Ov",
      "rec7iymBcLBwnkd20"
    ],
    "key (DO NOT EDIT)": "servingMember",
    id: "recC9OodJNCqbnGy2"
  },
  {
    display_text_english: "Benefits for family members",
    display_text_french: "Services pour membres de la famille",
    linked_question: ["patronType"],
    variable_name: "family",
    eligibilityPaths: [
      "recdSQlq9CZ7DFnqH",
      "recJxCbyWEnhFHJvj",
      "rec1dXWxOfzFZ6zKL",
      "reckiJxHt31Ql0vAw",
      "rec6usTRT8JfBWYBC",
      "recEkGEXb6BiUT4Ke",
      "recBlSOo6diB5tkwc",
      "recm2WbUjqAQPxbmB",
      "recXaPbzM7H7UoZn5",
      "recOsAgDhtvcoR4UD",
      "rec4zJqrgvVa7Rf4c",
      "recyyiggvT1GyQj45"
    ],
    ge_breadcrumb_english: "Family members",
    ge_breadcrumb_french: "Membres de la famille",
    "key (DO NOT EDIT)": "family",
    id: "recuWkVDSEWc1K0eU"
  },
  {
    display_text_english: "Grants for organizations",
    display_text_french: "Subventions pour organisations",
    linked_question: ["patronType"],
    "question display logic": ["rec99OzU3gXrs66zH"],
    questionClearLogic: ["rec7AIyz4BQjmGKT7"],
    variable_name: "organization",
    eligibilityPaths: ["rec04iKWngFVunoHt"],
    ge_breadcrumb_english: "Organizations",
    ge_breadcrumb_french: "Organisations",
    "key (DO NOT EDIT)": "organization",
    id: "rec2pB1RcV3BvyjPX"
  },
  {
    display_text_english: "Canadian Armed Forces",
    display_text_french: "Forces Armées Canadiennes",
    linked_question: ["serviceType"],
    variable_name: "CAF",
    eligibilityPaths: [
      "recxsl5L3LLGIT9rt",
      "recdSQlq9CZ7DFnqH",
      "recJxCbyWEnhFHJvj",
      "rec1dXWxOfzFZ6zKL",
      "reckiJxHt31Ql0vAw",
      "rec6usTRT8JfBWYBC",
      "recEkGEXb6BiUT4Ke",
      "recBlSOo6diB5tkwc",
      "recm2WbUjqAQPxbmB",
      "recU1DU5vDT8h3sOX",
      "rec8azbXzu0MLVs3y",
      "recGN6WlSHpAw3tt6",
      "rec7iymBcLBwnkd20"
    ],
    ge_breadcrumb_english: "Canadian Armed Forces",
    ge_breadcrumb_french: "Forces Armées Canadiennes",
    "key (DO NOT EDIT)": "CAF",
    id: "rec6sKyG0dMJ7HLhY"
  },
  {
    display_text_english: "Royal Canadian Mounted Police",
    display_text_french: "Gendarmerie royale du Canada",
    linked_question: ["serviceType"],
    variable_name: "RCMP",
    eligibilityPaths: [
      "recXaPbzM7H7UoZn5",
      "recOsAgDhtvcoR4UD",
      "recHYNXwAm2ncw4Ov"
    ],
    ge_breadcrumb_english: "Royal Canadian Mounted Police",
    ge_breadcrumb_french: "Gendarmerie royale du Canada",
    "key (DO NOT EDIT)": "RCMP",
    id: "recIMgfjrCozH9eVW"
  },
  {
    display_text_english: "WWII or Korean War Veterans",
    display_text_french:
      "Vétérans de la Seconde Guerre mondiale ou la guerre de Corée",
    linked_question: ["serviceType"],
    "question display logic": ["reczEVuK0ipZkAIec", "recEqeZzL7EjJ7NZV"],
    "question display logic 2": ["recdXDG6qy8fOltJr"],
    questionClearLogic: ["rec9DCmvkqeW06zqu"],
    variable_name: "WSV (WWII or Korea)",
    eligibilityPaths: [
      "rec4zJqrgvVa7Rf4c",
      "recyyiggvT1GyQj45",
      "recsOdDx7CWAftWIR",
      "rec55z5R3yz8JMv23"
    ],
    ge_breadcrumb_english: "WWII or Korean War Veterans",
    ge_breadcrumb_french:
      "Vétérans de la Seconde Guerre mondiale ou la guerre de Corée",
    "key (DO NOT EDIT)": "WSV (WWII or Korea)",
    id: "rec3hFX4SlnBMPl7W"
  },
  {
    display_text_english: "Still-serving",
    display_text_french: "En service actif",
    linked_question: ["statusAndVitals"],
    "question display logic 2": ["reczEVuK0ipZkAIec"],
    "questionClearLogic 2": ["rec9DCmvkqeW06zqu"],
    variable_name: "stillServing",
    eligibilityPaths: ["recdSQlq9CZ7DFnqH"],
    ge_breadcrumb_english: "Still-serving",
    ge_breadcrumb_french: "En service actif",
    "key (DO NOT EDIT)": "stillServing",
    id: "recM3T55J3Xf1qP16"
  },
  {
    display_text_english: "Released",
    display_text_french: "Libéré",
    linked_question: ["statusAndVitals"],
    variable_name: "releasedAlive",
    eligibilityPaths: ["recJxCbyWEnhFHJvj", "recm2WbUjqAQPxbmB"],
    ge_breadcrumb_english: "Released",
    ge_breadcrumb_french: "Libéré",
    "key (DO NOT EDIT)": "releasedAlive",
    id: "rec3vCJImDFrRIaFl"
  },
  {
    display_text_english: "Deceased",
    display_text_french: "Décédé",
    linked_question: ["statusAndVitals"],
    "question display logic 2": ["recn0zobKUhFIowAh"],
    "questionClearLogic 2": ["recP2ZH4HWTMkutPu"],
    variable_name: "deceased",
    eligibilityPaths: [
      "rec1dXWxOfzFZ6zKL",
      "reckiJxHt31Ql0vAw",
      "rec6usTRT8JfBWYBC",
      "recXaPbzM7H7UoZn5",
      "rec4zJqrgvVa7Rf4c"
    ],
    ge_breadcrumb_english: "Deceased",
    ge_breadcrumb_french: "Décédé",
    "key (DO NOT EDIT)": "deceased",
    id: "recDW9csGX2ekiwXb"
  },
  {
    display_text_english: "Yes",
    display_text_french: "Oui",
    linked_question: ["serviceHealthIssue"],
    variable_name: "hasServiceHealthIssue",
    eligibilityPaths: [
      "rec6usTRT8JfBWYBC",
      "recBlSOo6diB5tkwc",
      "recU1DU5vDT8h3sOX",
      "recGN6WlSHpAw3tt6",
      "recQerwEMBUU3TlRO",
      "recHYNXwAm2ncw4Ov",
      "rec55z5R3yz8JMv23",
      "rec7iymBcLBwnkd20",
      "recj4U5sS1GYwJJjq"
    ],
    ge_breadcrumb_english: "Has service-related health issue",
    ge_breadcrumb_french: "A un problème de santé lié au service",
    "key (DO NOT EDIT)": "hasServiceHealthIssue",
    id: "recxVaqj0O8BPKyeD"
  },
  {
    display_text_english: "No",
    display_text_french: "Non",
    linked_question: ["serviceHealthIssue"],
    variable_name: "noServiceHealthIssue",
    ge_breadcrumb_english: "No service-related health issue",
    ge_breadcrumb_french: "Aucun problème de santé lié au service",
    "key (DO NOT EDIT)": "noServiceHealthIssue",
    id: "recC0Rsw47ySCM1sS"
  }
];

export default multipleChoiceOptions;
