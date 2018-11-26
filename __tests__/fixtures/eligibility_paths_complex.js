const eligibilityPaths = [
  {
    benefits: [
      "rec45xfsf1ijZzXqM",
      "recKZD7EgawQUTf98",
      "recDU2iSRQ300ixBt",
      "recaa4nxdJnSV3NrJ"
    ],
    requirements: [
      "rec6sKyG0dMJ7HLhY",
      "recu6xP62BL9yFbWN",
      "recC9OodJNCqbnGy2"
    ],
    "key DO NOT EDIT": "CAF, veteran, servingMember",
    id: "recxsl5L3LLGIT9rt"
  },
  {
    benefits: [
      "recSb075Hz2383F75",
      "recnTqWEj6jCEF8h7",
      "receQA3URlp00lwE9",
      "rec3l8XwdR85xWNJ2",
      "recH5vAKgnu56IwlS",
      "rece4vwRrORpYznkw",
      "recPUSdA7VeaZGUGh"
    ],
    requirements: [
      "recxVaqj0O8BPKyeD",
      "rec6sKyG0dMJ7HLhY",
      "recu6xP62BL9yFbWN",
      "recC9OodJNCqbnGy2"
    ],
    "key DO NOT EDIT": "hasServiceHealthIssue, CAF, veteran, servingMember",
    id: "recU1DU5vDT8h3sOX"
  },
  {
    benefits: [
      "recMguNzAXgdpEDOJ",
      "recjDkgdzzzNS6i5A",
      "recukRMcsAVvBpDJi",
      "recVgcA6MDGMBFjzH",
      "reccTUqI8ybL1aHQR",
      "recTJGH8uGpz9FIcl",
      "recqpTIM3UcQkeRh0",
      "recL63epbxypNYRjL"
    ],
    requirements: ["rec6sKyG0dMJ7HLhY", "recu6xP62BL9yFbWN"],
    "key DO NOT EDIT": "CAF, veteran",
    id: "rec8azbXzu0MLVs3y"
  },
  {
    benefits: ["recOJ3P1wiacWA5jr", "recWJsoHvIkparQGd", "recPUSdA7VeaZGUGh"],
    requirements: [
      "recxVaqj0O8BPKyeD",
      "rec6sKyG0dMJ7HLhY",
      "recu6xP62BL9yFbWN"
    ],
    "key DO NOT EDIT": "hasServiceHealthIssue, CAF, veteran",
    id: "recGN6WlSHpAw3tt6"
  },
  {
    benefits: ["rec6osa4YoZNwJcNW", "recNsVtmotVHzDhAB", "recewrfxHbTWEVPig"],
    requirements: ["recxVaqj0O8BPKyeD", "recu6xP62BL9yFbWN"],
    "key DO NOT EDIT": "hasServiceHealthIssue, veteran",
    id: "recQerwEMBUU3TlRO"
  },
  {
    benefits: ["recWJsoHvIkparQGd"],
    requirements: [
      "recxVaqj0O8BPKyeD",
      "recIMgfjrCozH9eVW",
      "recu6xP62BL9yFbWN",
      "recC9OodJNCqbnGy2"
    ],
    "key DO NOT EDIT": "hasServiceHealthIssue, RCMP, veteran, servingMember",
    id: "recHYNXwAm2ncw4Ov"
  },
  {
    benefits: [
      "recKZD7EgawQUTf98",
      "recqpTIM3UcQkeRh0",
      "recVgcA6MDGMBFjzH",
      "reccTUqI8ybL1aHQR",
      "recDRPu2NF4UIximU"
    ],
    requirements: ["rec3hFX4SlnBMPl7W", "recu6xP62BL9yFbWN"],
    "key DO NOT EDIT": "WSV (WWII or Korea), veteran",
    id: "recsOdDx7CWAftWIR"
  },
  {
    benefits: ["recWJsoHvIkparQGd"],
    requirements: [
      "recxVaqj0O8BPKyeD",
      "rec3hFX4SlnBMPl7W",
      "recu6xP62BL9yFbWN"
    ],
    "key DO NOT EDIT": "hasServiceHealthIssue, WSV (WWII or Korea), veteran",
    id: "rec55z5R3yz8JMv23"
  },
  {
    benefits: [
      "recg5zjkXaddMWQEf",
      "recEW4yF4GE4V1lTS",
      "recjDkgdzzzNS6i5A",
      "recqpTIM3UcQkeRh0",
      "recO8NVH2tWIjNpDA",
      "reccTUqI8ybL1aHQR",
      "recDU2iSRQ300ixBt",
      "recMM2R9Dh1WUKxx6",
      "reczzwPrtckHy81oY"
    ],
    requirements: [
      "recDW9csGX2ekiwXb",
      "rec6sKyG0dMJ7HLhY",
      "recuWkVDSEWc1K0eU"
    ],
    "key DO NOT EDIT": "deceased, CAF, family",
    id: "rec1dXWxOfzFZ6zKL"
  },
  {
    benefits: ["recFMnhGVbQT8de27", "recBSXP6pYDS8xJJH"],
    requirements: [
      "recDW9csGX2ekiwXb",
      "rec6sKyG0dMJ7HLhY",
      "recuWkVDSEWc1K0eU"
    ],
    "key DO NOT EDIT": "deceased, CAF, family",
    id: "reckiJxHt31Ql0vAw"
  },
  {
    benefits: [
      "recSb075Hz2383F75",
      "recMguNzAXgdpEDOJ",
      "recOJ3P1wiacWA5jr",
      "recTJGH8uGpz9FIcl"
    ],
    requirements: [
      "recxVaqj0O8BPKyeD",
      "recDW9csGX2ekiwXb",
      "rec6sKyG0dMJ7HLhY",
      "recuWkVDSEWc1K0eU"
    ],
    "key DO NOT EDIT": "hasServiceHealthIssue, deceased, CAF, family",
    id: "rec6usTRT8JfBWYBC"
  },
  {
    benefits: ["recVgcA6MDGMBFjzH"],
    requirements: ["rec6sKyG0dMJ7HLhY", "recuWkVDSEWc1K0eU"],
    "key DO NOT EDIT": "CAF, family",
    id: "recEkGEXb6BiUT4Ke"
  },
  {
    benefits: ["recnTqWEj6jCEF8h7"],
    requirements: [
      "recxVaqj0O8BPKyeD",
      "rec6sKyG0dMJ7HLhY",
      "recuWkVDSEWc1K0eU"
    ],
    "key DO NOT EDIT": "hasServiceHealthIssue, CAF, family",
    id: "recBlSOo6diB5tkwc"
  },
  {
    benefits: ["recL63epbxypNYRjL", "recO8NVH2tWIjNpDA"],
    requirements: [
      "rec3vCJImDFrRIaFl",
      "rec6sKyG0dMJ7HLhY",
      "recuWkVDSEWc1K0eU"
    ],
    "key DO NOT EDIT": "releasedAlive, CAF, family",
    id: "recJxCbyWEnhFHJvj"
  },
  {
    benefits: ["recFMnhGVbQT8de27"],
    requirements: [
      "rec3vCJImDFrRIaFl",
      "rec6sKyG0dMJ7HLhY",
      "recuWkVDSEWc1K0eU"
    ],
    "key DO NOT EDIT": "releasedAlive, CAF, family",
    id: "recm2WbUjqAQPxbmB"
  },
  {
    benefits: ["recO8NVH2tWIjNpDA"],
    requirements: [
      "recM3T55J3Xf1qP16",
      "rec6sKyG0dMJ7HLhY",
      "recuWkVDSEWc1K0eU"
    ],
    "key DO NOT EDIT": "stillServing, CAF, family",
    id: "recdSQlq9CZ7DFnqH"
  },
  {
    benefits: ["recBSXP6pYDS8xJJH"],
    requirements: [
      "recDW9csGX2ekiwXb",
      "recIMgfjrCozH9eVW",
      "recuWkVDSEWc1K0eU"
    ],
    "key DO NOT EDIT": "deceased, RCMP, family",
    id: "recXaPbzM7H7UoZn5"
  },
  {
    benefits: ["reczzwPrtckHy81oY"],
    requirements: ["recIMgfjrCozH9eVW", "recuWkVDSEWc1K0eU"],
    "key DO NOT EDIT": "RCMP, family",
    id: "recOsAgDhtvcoR4UD"
  },
  {
    benefits: [
      "recEW4yF4GE4V1lTS",
      "recqpTIM3UcQkeRh0",
      "recBSXP6pYDS8xJJH",
      "reccTUqI8ybL1aHQR",
      "recMM2R9Dh1WUKxx6",
      "reczzwPrtckHy81oY",
      "recDRPu2NF4UIximU"
    ],
    requirements: [
      "recDW9csGX2ekiwXb",
      "rec3hFX4SlnBMPl7W",
      "recuWkVDSEWc1K0eU"
    ],
    "key DO NOT EDIT": "deceased, WSV (WWII or Korea), family",
    id: "rec4zJqrgvVa7Rf4c"
  },
  {
    benefits: ["recVgcA6MDGMBFjzH", "recFMnhGVbQT8de27"],
    requirements: ["rec3hFX4SlnBMPl7W", "recuWkVDSEWc1K0eU"],
    "key DO NOT EDIT": "WSV (WWII or Korea), family",
    id: "recyyiggvT1GyQj45"
  },
  {
    benefits: ["rec8GCHaN2UirvW8H", "rechnadMxMHp86vv8", "recpq5tKJOXWZ3JCS"],
    "key DO NOT EDIT": "no eligibility requirements",
    id: "recc8tZtc94wRhgxt"
  },
  {
    benefits: ["recmFhBkztEyJtm5R", "recowlPz6lmqcbp7F", "rec8GCHaN2UirvW8H"],
    requirements: ["rec2pB1RcV3BvyjPX"],
    "key DO NOT EDIT": "organization",
    id: "rec04iKWngFVunoHt"
  },
  {
    benefits: ["recFMnhGVbQT8de27"],
    requirements: ["recu6xP62BL9yFbWN"],
    "key DO NOT EDIT": "veteran",
    id: "recrvk509oay9Vqd2"
  },
  {
    benefits: ["recOJ3P1wiacWA5jr"],
    requirements: [
      "recxVaqj0O8BPKyeD",
      "rec6sKyG0dMJ7HLhY",
      "recC9OodJNCqbnGy2"
    ],
    "key DO NOT EDIT": "hasServiceHealthIssue, CAF, servingMember",
    id: "rec7iymBcLBwnkd20"
  },
  {
    benefits: ["recCkQL77l0KZ2u7Y"],
    requirements: ["recxVaqj0O8BPKyeD", "recu6xP62BL9yFbWN"],
    "key DO NOT EDIT": "hasServiceHealthIssue, veteran",
    id: "recj4U5sS1GYwJJjq"
  }
];

export default eligibilityPaths;
