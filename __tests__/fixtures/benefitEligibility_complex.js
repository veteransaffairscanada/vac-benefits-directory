const benefitEligibilityFixture = [
  {
    benefit: ["rec7vYqDWYPQnDcRK"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceType: ["rec3hFX4SlnBMPl7W"],
    Name: "recfWHf1YmVfz0ppj",
    path: "veteran + WSV (WWII or Korea)"
  },
  {
    benefit: ["recNsVtmotVHzDhAB"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "rec6ejmokDXrYAUqT",
    path: "veteran + hasServiceHealthIssue"
  },
  {
    benefit: ["recMguNzAXgdpEDOJ"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "recOVWkhp1IfbFnRU",
    path: "family + CAF + deceased + hasServiceHealthIssue"
  },
  {
    benefit: ["recMguNzAXgdpEDOJ"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    Name: "recGR0KBNakgQbLG5",
    path: "veteran + CAF"
  },
  {
    benefit: ["rece4vwRrORpYznkw"],
    patronType: ["recu6xP62BL9yFbWN", "recC9OodJNCqbnGy2"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "recR4crMdLtxDz0cf",
    path: "veteran, servingMember + CAF + hasServiceHealthIssue"
  },
  {
    benefit: ["rec45xfsf1ijZzXqM"],
    patronType: ["recu6xP62BL9yFbWN", "recC9OodJNCqbnGy2"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    Name: "recl8EQBaoPvkUs1y",
    path: "veteran, servingMember + CAF"
  },
  {
    benefit: ["recL63epbxypNYRjL"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    Name: "rec3LMYRHMRfFdc2E",
    path: "veteran + CAF"
  },
  {
    benefit: ["recL63epbxypNYRjL"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    statusAndVitals: ["rec3vCJImDFrRIaFl"],
    Name: "recC1BOsrEwQQT7Tr",
    path: "family + CAF + releasedAlive"
  },
  {
    benefit: ["recEHxSnVLcMvYnbS"],
    patronType: ["recuWkVDSEWc1K0eU"],
    statusAndVitals: ["rec3vCJImDFrRIaFl"],
    Name: "recXSg015decd4TOq",
    path: "family + releasedAlive"
  },
  {
    benefit: ["recVKse8WgvLYcfgP"],
    patronType: ["recuWkVDSEWc1K0eU"],
    statusAndVitals: ["rec3vCJImDFrRIaFl"],
    Name: "recWmF49cJ0evYv0F",
    path: "family + releasedAlive"
  },
  {
    benefit: ["recVKse8WgvLYcfgP"],
    patronType: ["recu6xP62BL9yFbWN"],
    Name: "recxyzl32f531NaOr",
    path: "veteran"
  },
  {
    benefit: ["rec6osa4YoZNwJcNW"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "recBwJVJsjz3KF2kz",
    path: "veteran + hasServiceHealthIssue"
  },
  {
    benefit: ["recowlPz6lmqcbp7F"],
    patronType: ["rec2pB1RcV3BvyjPX"],
    Name: "recgFx9UqPwqSW6hO",
    path: "organization"
  },
  {
    benefit: ["recmFhBkztEyJtm5R"],
    patronType: ["rec2pB1RcV3BvyjPX"],
    Name: "recbbyAFXpnjEAmZ9",
    path: "organization"
  },
  {
    benefit: ["recH5vAKgnu56IwlS"],
    patronType: ["recu6xP62BL9yFbWN", "recC9OodJNCqbnGy2"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "recoWEBTf2fHKxO8T",
    path: "veteran, servingMember + CAF + hasServiceHealthIssue"
  },
  {
    benefit: ["recMM2R9Dh1WUKxx6"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "reclYWjGKy8oabUkO",
    path: "family + CAF + deceased + hasServiceHealthIssue"
  },
  {
    benefit: ["recDU2iSRQ300ixBt"],
    patronType: ["recu6xP62BL9yFbWN", "recC9OodJNCqbnGy2"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    Name: "recNbQZ8omQdO5FhH",
    path: "veteran, servingMember + CAF"
  },
  {
    benefit: ["recOJ3P1wiacWA5jr"],
    patronType: ["recC9OodJNCqbnGy2"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "recPwgIAvnOrF9CZE",
    path: "servingMember + CAF + hasServiceHealthIssue"
  },
  {
    benefit: ["recOJ3P1wiacWA5jr"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    Name: "rechaKl1wJhKe0lnF",
    path: "family + CAF + deceased"
  },
  {
    benefit: ["recOJ3P1wiacWA5jr"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "recmsrOwzHKCsUNl6",
    path: "veteran + CAF + hasServiceHealthIssue"
  },
  {
    benefit: ["recukRMcsAVvBpDJi"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    Name: "recQBzCRl2D8B7lxu",
    path: "veteran + CAF"
  },
  {
    benefit: ["recg5zjkXaddMWQEf"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    Name: "recpCQ81MXjUrrerT",
    path: "family + CAF + deceased"
  },
  {
    benefit: ["recCkQL77l0KZ2u7Y"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "recgi1wg3Z0xhI0KC",
    path: "veteran + hasServiceHealthIssue"
  },
  {
    benefit: ["recYOyXOqqSSCUVcN"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    Name: "recdtaTP1HL6hgId7",
    path: "family + CAF + deceased"
  },
  {
    benefit: ["recEW4yF4GE4V1lTS"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec3hFX4SlnBMPl7W"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    Name: "recIKNddEHsrPobsJ",
    path: "family + WSV (WWII or Korea) + deceased"
  },
  {
    benefit: ["recEW4yF4GE4V1lTS"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    Name: "recvSEet4Pf5xm2Ng",
    path: "family + CAF + deceased"
  },
  {
    benefit: ["rec3l8XwdR85xWNJ2"],
    patronType: ["recu6xP62BL9yFbWN", "recC9OodJNCqbnGy2"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "rec9M3lN0KwS8CJmj",
    path: "veteran, servingMember + CAF + hasServiceHealthIssue"
  },
  {
    benefit: ["reczzwPrtckHy81oY"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["recIMgfjrCozH9eVW"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    Name: "rechEoLL5pBxeHcGN",
    path: "family + RCMP + deceased"
  },
  {
    benefit: ["reczzwPrtckHy81oY"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec3hFX4SlnBMPl7W"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    Name: "recoztJkT5J9MYX2G",
    path: "family + WSV (WWII or Korea) + deceased"
  },
  {
    benefit: ["reczzwPrtckHy81oY"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    Name: "recRligLod0I0IhcP",
    path: "family + CAF + deceased"
  },
  {
    benefit: ["recaa4nxdJnSV3NrJ"],
    patronType: ["recu6xP62BL9yFbWN", "recC9OodJNCqbnGy2"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    Name: "recAz6FLY6qy3GkHd",
    path: "veteran, servingMember + CAF"
  },
  {
    benefit: ["recKZD7EgawQUTf98"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceType: ["rec3hFX4SlnBMPl7W"],
    Name: "recyyVwXzhgcX14IC",
    path: "veteran + WSV (WWII or Korea)"
  },
  {
    benefit: ["recKZD7EgawQUTf98"],
    patronType: ["recu6xP62BL9yFbWN", "recC9OodJNCqbnGy2"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    Name: "recJDGon9UpIRv1C6",
    path: "veteran, servingMember + CAF"
  },
  {
    benefit: ["rechnadMxMHp86vv8"],
    patronType: ["recu6xP62BL9yFbWN", "recC9OodJNCqbnGy2"],
    Name: "recg7V3k3ol4FLAMh",
    path: "veteran, servingMember"
  },
  {
    benefit: ["rechnadMxMHp86vv8"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec3vCJImDFrRIaFl"],
    Name: "rece3ZFiriZxO63e4",
    path: "family + releasedAlive"
  },
  {
    benefit: ["recVgcA6MDGMBFjzH"],
    patronType: ["recuWkVDSEWc1K0eU", "recu6xP62BL9yFbWN"],
    serviceType: ["rec6sKyG0dMJ7HLhY", "rec3hFX4SlnBMPl7W"],
    Name: "recxq80Dbs1ijRlaE",
    path: "family, veteran + CAF, WSV (WWII or Korea)"
  },
  {
    benefit: ["reccTUqI8ybL1aHQR"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec3hFX4SlnBMPl7W"],
    statusAndVitals: ["rec3vCJImDFrRIaFl"],
    Name: "rec0AZCo8gx3HzLy1",
    path: "family + WSV (WWII or Korea) + releasedAlive"
  },
  {
    benefit: ["reccTUqI8ybL1aHQR"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceType: ["rec3hFX4SlnBMPl7W"],
    Name: "recaVVZzKjrd2Duj8",
    path: "veteran + WSV (WWII or Korea)"
  },
  {
    benefit: ["recPUSdA7VeaZGUGh"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "recBr3SAQU0GijleA",
    path: "family + CAF + deceased + hasServiceHealthIssue"
  },
  {
    benefit: ["recPUSdA7VeaZGUGh"],
    patronType: ["recu6xP62BL9yFbWN", "recC9OodJNCqbnGy2"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "recGkh4BgTTH4ibVq",
    path: "veteran, servingMember + CAF + hasServiceHealthIssue"
  },
  {
    benefit: ["recjDkgdzzzNS6i5A"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    Name: "recDSeANhF5XrVRcr",
    path: "family + CAF + deceased"
  },
  {
    benefit: ["recjDkgdzzzNS6i5A"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    Name: "recxc6T4F7Ft3bF0t",
    path: "veteran + CAF"
  },
  {
    benefit: ["recTJGH8uGpz9FIcl"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    Name: "recmRtb7mI9XaukBw",
    path: "veteran + CAF"
  },
  {
    benefit: ["recTJGH8uGpz9FIcl"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "recgsVRR5F96KoQvT",
    path: "family + CAF + deceased + hasServiceHealthIssue"
  },
  {
    benefit: ["recBSXP6pYDS8xJJH"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: [
      "rec6sKyG0dMJ7HLhY",
      "rec3hFX4SlnBMPl7W",
      "recIMgfjrCozH9eVW"
    ],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    Name: "recGSaT5q7VLKIDtA",
    path: "family + CAF, WSV (WWII or Korea), RCMP + deceased"
  },
  {
    benefit: ["recewrfxHbTWEVPig"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "recEfRVYLpvWvqISx",
    path: "veteran + hasServiceHealthIssue"
  },
  {
    benefit: ["recpq5tKJOXWZ3JCS"],
    patronType: ["recu6xP62BL9yFbWN"],
    Name: "recs1qwbmkLwDiA7Z",
    path: "veteran"
  },
  {
    benefit: ["recpq5tKJOXWZ3JCS"],
    patronType: ["recuWkVDSEWc1K0eU"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    Name: "receBHaEdQ29Qid3n",
    path: "family + deceased"
  },
  {
    benefit: ["recnTqWEj6jCEF8h7"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "recdzam05SfCt5PqJ",
    path: "family + CAF + hasServiceHealthIssue"
  },
  {
    benefit: ["recnTqWEj6jCEF8h7"],
    patronType: ["recu6xP62BL9yFbWN", "recC9OodJNCqbnGy2"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    serviceHealthIssue: ["recxVaqj0O8BPKyeD"],
    Name: "recefz1kpLFu7Vkxh",
    path: "veteran, servingMember + CAF + hasServiceHealthIssue"
  },
  {
    benefit: ["recFMnhGVbQT8de27"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceType: ["rec6sKyG0dMJ7HLhY", "rec3hFX4SlnBMPl7W"],
    statusAndVitals: ["rec3vCJImDFrRIaFl"],
    Name: "rec6vIdu4K8xl1nxi",
    path: "veteran + CAF, WSV (WWII or Korea) + releasedAlive"
  },
  {
    benefit: ["recFMnhGVbQT8de27"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec3hFX4SlnBMPl7W", "rec6sKyG0dMJ7HLhY"],
    statusAndVitals: ["rec3vCJImDFrRIaFl", "recDW9csGX2ekiwXb"],
    Name: "recwtgBef5LIpUifM",
    path: "family + WSV (WWII or Korea), CAF + releasedAlive, deceased"
  },
  {
    benefit: ["recqpTIM3UcQkeRh0"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceType: ["rec6sKyG0dMJ7HLhY", "rec3hFX4SlnBMPl7W"],
    Name: "recnz9qP2cSNgBzE8",
    path: "veteran + CAF, WSV (WWII or Korea)"
  },
  {
    benefit: ["recqpTIM3UcQkeRh0"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec3hFX4SlnBMPl7W"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    Name: "rechrkjJpnl8ZEamI",
    path: "family + WSV (WWII or Korea) + deceased"
  },
  {
    benefit: ["recO8NVH2tWIjNpDA"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec6sKyG0dMJ7HLhY"],
    statusAndVitals: [
      "recM3T55J3Xf1qP16",
      "rec3vCJImDFrRIaFl",
      "recDW9csGX2ekiwXb"
    ],
    Name: "recQKuvUeQib6xDlk",
    path: "family + CAF + stillServing, releasedAlive, deceased"
  },
  {
    benefit: ["recDRPu2NF4UIximU"],
    patronType: ["recuWkVDSEWc1K0eU"],
    serviceType: ["rec3hFX4SlnBMPl7W"],
    statusAndVitals: ["recDW9csGX2ekiwXb"],
    Name: "recxiPnxu1B8Xq1HX",
    path: "family + WSV (WWII or Korea) + deceased"
  },
  {
    benefit: ["recDRPu2NF4UIximU"],
    patronType: ["recu6xP62BL9yFbWN"],
    serviceType: ["rec3hFX4SlnBMPl7W"],
    Name: "recqM9VdRHwdy35Xf",
    path: "veteran + WSV (WWII or Korea)"
  }
];
export default benefitEligibilityFixture;
