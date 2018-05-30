const benefitsFixture = [
  {
    id: "1",
    vacNameEn: "Disability Award",
    vacNameFr: "Prix ​​d'invalidité",
    benefitPageEn: "English link",
    benefitPageFr: "French link",
    availableIndependently: "Requires Gateway Benefit"
  },
  {
    id: "0",
    vacNameEn: "Disability Pension",
    vacNameFr: "Pension d'invalidité",
    benefitPageEn: "English link",
    benefitPageFr: "French link",
    childBenefits: ["1"],
    availableIndependently: "Independant"
  },
  {
    id: "3",
    vacNameEn: "Veterans Independence Program",
    vacNameFr: "Programme pour l'autonomie des anciens combattants (PAAC)",
    benefitPageEn: "English link",
    benefitPageFr: "French link",
    availableIndependently: "Independant",
    sortingPriority: "high"
  }
];

export default benefitsFixture;
