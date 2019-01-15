const eligibilityPaths = [
  {
    benefits: ["recVgcA6MDGMBFjzH"],
    requirements: ["recuWkVDSEWc1K0eU", "rec6sKyG0dMJ7HLhY"],
    "key DO NOT EDIT": "family, CAF",
    id: "recEkGEXb6BiUT4Ke",
    admin_display: "patronType = family, serviceType = CAF"
  },
  {
    benefits: [
      "rec45xfsf1ijZzXqM",
      "recKZD7EgawQUTf98",
      "recDU2iSRQ300ixBt",
      "recaa4nxdJnSV3NrJ"
    ],
    requirements: [
      "recu6xP62BL9yFbWN",
      "recC9OodJNCqbnGy2",
      "rec6sKyG0dMJ7HLhY"
    ],
    "key DO NOT EDIT": "veteran, servingMember, CAF",
    id: "recxsl5L3LLGIT9rt",
    admin_display:
      "patronType = veteran, patronType = servingMember, serviceType = CAF"
  },
  {
    benefits: [
      "recMguNzAXgdpEDOJ",
      "recjDkgdzzzNS6i5A",
      "recukRMcsAVvBpDJi",
      "recVgcA6MDGMBFjzH",
      "recTJGH8uGpz9FIcl",
      "recqpTIM3UcQkeRh0",
      "recL63epbxypNYRjL",
      "recFMnhGVbQT8de27"
    ],
    requirements: ["recu6xP62BL9yFbWN", "rec6sKyG0dMJ7HLhY"],
    "key DO NOT EDIT": "veteran, CAF",
    id: "rec8azbXzu0MLVs3y",
    admin_display: "patronType = veteran, serviceType = CAF"
  },
  {
    benefits: [
      "recg5zjkXaddMWQEf",
      "recEW4yF4GE4V1lTS",
      "recjDkgdzzzNS6i5A",
      "recO8NVH2tWIjNpDA",
      "reczzwPrtckHy81oY",
      "recBSXP6pYDS8xJJH",
      "recFMnhGVbQT8de27",
      "recYOyXOqqSSCUVcN"
    ],
    requirements: [
      "recuWkVDSEWc1K0eU",
      "rec6sKyG0dMJ7HLhY",
      "recDW9csGX2ekiwXb"
    ],
    "key DO NOT EDIT": "family, CAF, deceased",
    id: "rec1dXWxOfzFZ6zKL",
    admin_display:
      "patronType = family, serviceType = CAF, statusAndVitals = deceased"
  },
  {
    benefits: ["recBSXP6pYDS8xJJH", "reczzwPrtckHy81oY"],
    requirements: [
      "recuWkVDSEWc1K0eU",
      "recIMgfjrCozH9eVW",
      "recDW9csGX2ekiwXb"
    ],
    "key DO NOT EDIT": "family, RCMP, deceased",
    id: "recXaPbzM7H7UoZn5",
    admin_display:
      "patronType = family, serviceType = RCMP, statusAndVitals = deceased"
  },
  {
    benefits: [
      "recEW4yF4GE4V1lTS",
      "recBSXP6pYDS8xJJH",
      "reczzwPrtckHy81oY",
      "recDRPu2NF4UIximU"
    ],
    requirements: [
      "recuWkVDSEWc1K0eU",
      "rec3hFX4SlnBMPl7W",
      "recDW9csGX2ekiwXb"
    ],
    "key DO NOT EDIT": "family, WSV (WWII or Korea), deceased",
    id: "rec4zJqrgvVa7Rf4c",
    admin_display:
      "patronType = family, serviceType = WSV (WWII or Korea), statusAndVitals = deceased"
  },
  {
    benefits: ["recnTqWEj6jCEF8h7"],
    requirements: [
      "recuWkVDSEWc1K0eU",
      "rec6sKyG0dMJ7HLhY",
      "recxVaqj0O8BPKyeD"
    ],
    nextSteps: ["recp2EOCHfUhGU2jq"],
    "key DO NOT EDIT": "family, CAF, hasServiceHealthIssue",
    id: "recBlSOo6diB5tkwc",
    admin_display:
      "patronType = family, serviceType = CAF, serviceHealthIssue = hasServiceHealthIssue"
  },
  {
    benefits: ["recOJ3P1wiacWA5jr"],
    requirements: [
      "recC9OodJNCqbnGy2",
      "rec6sKyG0dMJ7HLhY",
      "recxVaqj0O8BPKyeD"
    ],
    "key DO NOT EDIT": "servingMember, CAF, hasServiceHealthIssue",
    id: "rec7iymBcLBwnkd20",
    admin_display:
      "patronType = servingMember, serviceType = CAF, serviceHealthIssue = hasServiceHealthIssue"
  },
  {
    benefits: [
      "recnTqWEj6jCEF8h7",
      "rec3l8XwdR85xWNJ2",
      "recH5vAKgnu56IwlS",
      "rece4vwRrORpYznkw",
      "recPUSdA7VeaZGUGh",
      "rec0jzif5VceIWKh3"
    ],
    requirements: [
      "recu6xP62BL9yFbWN",
      "recC9OodJNCqbnGy2",
      "rec6sKyG0dMJ7HLhY",
      "recxVaqj0O8BPKyeD"
    ],
    "key DO NOT EDIT": "veteran, servingMember, CAF, hasServiceHealthIssue",
    id: "recU1DU5vDT8h3sOX",
    admin_display:
      "patronType = veteran, patronType = servingMember, serviceType = CAF, serviceHealthIssue = hasServiceHealthIssue"
  },
  {
    benefits: ["recOJ3P1wiacWA5jr", "recPUSdA7VeaZGUGh", "recR3CLbZSRlbGQJV"],
    requirements: [
      "recu6xP62BL9yFbWN",
      "rec6sKyG0dMJ7HLhY",
      "recxVaqj0O8BPKyeD"
    ],
    "key DO NOT EDIT": "veteran, CAF, hasServiceHealthIssue",
    id: "recGN6WlSHpAw3tt6",
    admin_display:
      "patronType = veteran, serviceType = CAF, serviceHealthIssue = hasServiceHealthIssue"
  },
  {
    benefits: [
      "recMguNzAXgdpEDOJ",
      "recTJGH8uGpz9FIcl",
      "recPUSdA7VeaZGUGh",
      "recMM2R9Dh1WUKxx6",
      "recXrrmxgZ66BoiK3"
    ],
    requirements: [
      "recuWkVDSEWc1K0eU",
      "rec6sKyG0dMJ7HLhY",
      "recDW9csGX2ekiwXb",
      "recxVaqj0O8BPKyeD"
    ],
    "key DO NOT EDIT": "family, CAF, deceased, hasServiceHealthIssue",
    id: "rec6usTRT8JfBWYBC",
    admin_display:
      "patronType = family, serviceType = CAF, statusAndVitals = deceased, serviceHealthIssue = hasServiceHealthIssue"
  },
  {
    benefits: ["rec0jzif5VceIWKh3"],
    requirements: [
      "recu6xP62BL9yFbWN",
      "recC9OodJNCqbnGy2",
      "recIMgfjrCozH9eVW",
      "recxVaqj0O8BPKyeD"
    ],
    "key DO NOT EDIT": "veteran, servingMember, RCMP, hasServiceHealthIssue",
    id: "recHYNXwAm2ncw4Ov",
    admin_display:
      "patronType = veteran, patronType = servingMember, serviceType = RCMP, serviceHealthIssue = hasServiceHealthIssue"
  },
  {
    benefits: ["rec6osa4YoZNwJcNW", "recNsVtmotVHzDhAB", "recewrfxHbTWEVPig"],
    requirements: ["recu6xP62BL9yFbWN", "recxVaqj0O8BPKyeD"],
    "key DO NOT EDIT": "veteran, hasServiceHealthIssue",
    id: "recQerwEMBUU3TlRO",
    admin_display:
      "patronType = veteran, serviceHealthIssue = hasServiceHealthIssue"
  },
  {
    benefits: ["recCkQL77l0KZ2u7Y"],
    requirements: ["recu6xP62BL9yFbWN", "recxVaqj0O8BPKyeD"],
    "key DO NOT EDIT": "veteran, hasServiceHealthIssue",
    id: "recj4U5sS1GYwJJjq",
    admin_display:
      "patronType = veteran, serviceHealthIssue = hasServiceHealthIssue"
  },
  {
    benefits: ["rec0jzif5VceIWKh3"],
    requirements: [
      "recu6xP62BL9yFbWN",
      "rec3hFX4SlnBMPl7W",
      "recxVaqj0O8BPKyeD"
    ],
    "key DO NOT EDIT": "veteran, WSV (WWII or Korea), hasServiceHealthIssue",
    id: "rec55z5R3yz8JMv23",
    admin_display:
      "patronType = veteran, serviceType = WSV (WWII or Korea), serviceHealthIssue = hasServiceHealthIssue"
  },
  {
    benefits: [
      "recmFhBkztEyJtm5R",
      "recowlPz6lmqcbp7F",
      "rec8GCHaN2UirvW8H",
      "recZv71nHMgCoX93h"
    ],
    requirements: ["rec2pB1RcV3BvyjPX"],
    "key DO NOT EDIT": "organization",
    id: "rec04iKWngFVunoHt",
    admin_display: "patronType = organization"
  },
  {
    benefits: ["recL63epbxypNYRjL", "recO8NVH2tWIjNpDA", "recFMnhGVbQT8de27"],
    requirements: [
      "recuWkVDSEWc1K0eU",
      "rec6sKyG0dMJ7HLhY",
      "rec3vCJImDFrRIaFl"
    ],
    "key DO NOT EDIT": "family, CAF, releasedAlive",
    id: "recJxCbyWEnhFHJvj",
    admin_display:
      "patronType = family, serviceType = CAF, statusAndVitals = releasedAlive"
  },
  {
    benefits: ["recVKse8WgvLYcfgP", "recEHxSnVLcMvYnbS"],
    requirements: ["recuWkVDSEWc1K0eU", "rec3vCJImDFrRIaFl"],
    "key DO NOT EDIT": "family, releasedAlive",
    id: "rec7YU77wS3rAEu3s",
    admin_display: "patronType = family, statusAndVitals = releasedAlive"
  },
  {
    benefits: ["reccTUqI8ybL1aHQR"],
    requirements: [
      "rec3hFX4SlnBMPl7W",
      "recuWkVDSEWc1K0eU",
      "rec3vCJImDFrRIaFl"
    ],
    "key DO NOT EDIT": "WSV (WWII or Korea), family, releasedAlive",
    id: "recTg173gsbgdSMmx",
    admin_display:
      "serviceType = WSV (WWII or Korea), patronType = family, statusAndVitals = releasedAlive"
  },
  {
    benefits: ["rechnadMxMHp86vv8"],
    requirements: ["recuWkVDSEWc1K0eU", "rec3vCJImDFrRIaFl"],
    "key DO NOT EDIT": "family, releasedAlive",
    id: "recc8tZtc94wRhgxt",
    admin_display: "patronType = family, statusAndVitals = releasedAlive"
  },
  {
    benefits: ["recO8NVH2tWIjNpDA"],
    requirements: [
      "recuWkVDSEWc1K0eU",
      "rec6sKyG0dMJ7HLhY",
      "recM3T55J3Xf1qP16"
    ],
    "key DO NOT EDIT": "family, CAF, stillServing",
    id: "recdSQlq9CZ7DFnqH",
    admin_display:
      "patronType = family, serviceType = CAF, statusAndVitals = stillServing"
  },
  {
    benefits: ["recpq5tKJOXWZ3JCS"],
    requirements: ["recuWkVDSEWc1K0eU", "recDW9csGX2ekiwXb"],
    "key DO NOT EDIT": "family, deceased",
    id: "recrvk509oay9Vqd2",
    admin_display: "patronType = family, statusAndVitals = deceased"
  },
  {
    benefits: ["recVKse8WgvLYcfgP", "recpq5tKJOXWZ3JCS", "rechnadMxMHp86vv8"],
    requirements: ["recu6xP62BL9yFbWN"],
    "key DO NOT EDIT": "veteran",
    id: "recmKzJ6y5K1TgEiI",
    admin_display: "patronType = veteran"
  },
  {
    benefits: ["recVgcA6MDGMBFjzH", "recFMnhGVbQT8de27"],
    requirements: ["recuWkVDSEWc1K0eU", "rec3hFX4SlnBMPl7W"],
    "key DO NOT EDIT": "family, WSV (WWII or Korea)",
    id: "recyyiggvT1GyQj45",
    admin_display: "patronType = family, serviceType = WSV (WWII or Korea)"
  },
  {
    benefits: [
      "recKZD7EgawQUTf98",
      "recqpTIM3UcQkeRh0",
      "recVgcA6MDGMBFjzH",
      "reccTUqI8ybL1aHQR",
      "recDRPu2NF4UIximU",
      "rec7vYqDWYPQnDcRK"
    ],
    requirements: ["recu6xP62BL9yFbWN", "rec3hFX4SlnBMPl7W"],
    "key DO NOT EDIT": "veteran, WSV (WWII or Korea)",
    id: "recsOdDx7CWAftWIR",
    admin_display: "patronType = veteran, serviceType = WSV (WWII or Korea)"
  },
  {
    benefits: ["rechnadMxMHp86vv8"],
    requirements: ["recC9OodJNCqbnGy2"],
    nextSteps: ["recKyNwxKXQQGcokF", "recdLLujXxdXQEzXC"],
    "key DO NOT EDIT": "servingMember",
    id: "recR03cJel83BGYSD",
    admin_display: "patronType = servingMember"
  },
  {
    nextSteps: ["recDGuWEo84Pie18s", "recg5X7mEmlm4Qb2C", "recyxzgPs14QzD8uS"],
    "key DO NOT EDIT": "no eligibility requirements",
    id: "recDABExyenzg5QNw"
  },
  {
    benefits: ["recoqXJ7Tx3XaDdFE"],
    requirements: ["recC9OodJNCqbnGy2", "rec6sKyG0dMJ7HLhY"],
    "key DO NOT EDIT": "servingMember, CAF",
    id: "recvv3CfQZ7HTWxdA",
    admin_display: "patronType = servingMember, serviceType = CAF"
  }
];

export default eligibilityPaths;
