const benefitsFixture = [
  {
    id: "1",
    vacNameEn: "Disability Award",
    vacNameFr: "Prix ​​d'invalidité",
    benefitPageEn: "English link",
    benefitPageFr: "French link",
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
  }
];

export default benefitsFixture;
