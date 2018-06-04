const benefitsFixture = [
  {
    id: "1",
    vacNameEn: "Disability Award",
    vacNameFr: "Prix ​​d'invalidité",
    benefitPageEn: "English link",
    benefitPageFr: "French link",
    oneLineDescriptionEn: "English benefit Description",
    oneLineDescriptionFr: "Description de l'avantage français",
    availableIndependently: "Requires Gateway Benefit",
    examples: ["0", "1"]
  },
  {
    id: "0",
    vacNameEn: "Disability Pension",
    vacNameFr: "Pension d'invalidité",
    benefitPageEn: "English link",
    benefitPageFr: "French link",
    childBenefits: ["1"],
    availableIndependently: "Independant",
    examples: undefined
  },
  {
    id: "3",
    vacNameEn: "Veterans Independence Program",
    vacNameFr: "Programme pour l'autonomie des anciens combattants (PAAC)",
    benefitPageEn: "English link",
    benefitPageFr: "French link",
    sortingPriority: "high",
    availableIndependently: "Independant",
    examples: undefined
  }
];

export default benefitsFixture;
