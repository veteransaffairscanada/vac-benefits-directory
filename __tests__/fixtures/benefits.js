const benefitsFixture = [
  {
    id: "benefit_0",
    vacNameEn: "b0_en",
    vacNameFr: "b0_fr",
    benefitPageEn: "b0_link_en",
    benefitPageFr: "b0_link_fr",
    oneLineDescriptionEn: "b0_desc_en",
    oneLineDescriptionFr: "b0_desc_fr",
    needs: ["need_0", "need_1"],
    childBenefits: ["benefit_1"],
    availableIndependently: "Independent",
    sortingPriority: "low",
    eligibilityPaths: ["ep_0"]
  },
  {
    id: "benefit_1",
    vacNameEn: "b1_en",
    vacNameFr: "b1_fr",
    benefitPageEn: "b1_link_en",
    benefitPageFr: "b1_link_fr",
    oneLineDescriptionEn: "b1_desc_en",
    oneLineDescriptionFr: "b1_desc_fr",
    needs: ["need_0", "need_1"],
    availableIndependently: "Requires Gateway Benefit",
    noteEn: "note_1_en",
    noteFr: "note_1_fr",
    sortingPriority: "medium",
    eligibilityPaths: ["ep_2"]
  },
  {
    id: "benefit_3",
    vacNameEn: "b3_en",
    vacNameFr: "b3_fr",
    benefitPageEn: "b3_link_en",
    benefitPageFr: "b3_link_fr",
    oneLineDescriptionEn: "b3_desc_en",
    oneLineDescriptionFr: "b3_desc_fr",
    needs: ["need_0", "need_1"],
    availableIndependently: "Independent",
    eligibilityPaths: ["ep_2"]
  },
  {
    id: "benefit_2",
    vacNameEn: "b2_en",
    vacNameFr: "b2_fr",
    benefitPageEn: "b2_link_en",
    benefitPageFr: "b2_link_fr",
    oneLineDescriptionEn: "b2_desc_en",
    oneLineDescriptionFr: "b2_desc_fr",
    availableIndependently: "Requires Gateway Benefit",
    needs: ["need_3"],
    noteEn: "note_2_en",
    noteFr: "note_2_fr",
    sortingPriority: "high",
    eligibilityPaths: ["ep_0", "ep_1"]
  }
];

export default benefitsFixture;
