const benefitsFixture = [
  {
    id: "benefit_4",
    vacNameEn: "b4_en",
    vacNameFr: "b4_fr",
    benefitPageEn: "b4_link_en",
    benefitPageFr: "b4_link_fr",
    oneLineDescriptionEn: "b4_desc_en",
    oneLineDescriptionFr: "b4_desc_fr",
    needs: ["need_3"],
    sortOrder: "1",
    availableIndependently: "Independent",
    benefitEligibility: ["4", "6"]
  },
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
    noteEn: "note_0_en [test link](/some_url)",
    noteFr: "note_0_fr [french test link](/some_french_url)",
    sortOrder: "30",
    benefitEligibility: ["0"],
    seeMoreSentenceEn: "seeMoreSentenceEn",
    seeMoreSentenceFr: "seeMoreSentenceFr"
  },
  {
    id: "benefit_3",
    vacNameEn: "b3_en",
    vacNameFr: "b3_fr",
    benefitPageEn: "b3_link_en",
    benefitPageFr: "b3_link_fr",
    oneLineDescriptionEn: "b3_desc_en",
    oneLineDescriptionFr: "b3_desc_fr",
    needs: ["need_2"],
    availableIndependently: "Independent",
    benefitEligibility: ["4", "6"]
  },
  {
    id: "benefit_1",
    vacNameEn: "b1_en",
    vacNameFr: "b1_fr",
    benefitPageEn: "b1_link_en",
    benefitPageFr: "b1_link_fr",
    oneLineDescriptionEn: "b1_desc_en",
    oneLineDescriptionFr: "b1_desc_fr",
    needs: ["need_0", "need_2"],
    availableIndependently: "Requires Gateway Benefit",
    noteEn: "note_1_en",
    noteFr: "note_1_fr",
    sortOrder: "41",
    benefitEligibility: ["3", "5"]
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
    needs: ["need_1"],
    noteEn: "note_2_en",
    noteFr: "note_2_fr",
    sortOrder: "3",
    benefitEligibility: ["1"]
  }
];

export default benefitsFixture;
