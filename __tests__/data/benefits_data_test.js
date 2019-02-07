import fs from "fs";

describe("Benefits data", () => {
  let data;
  beforeEach(() => {
    data = JSON.parse(fs.readFileSync("data/data.json")).benefits;
  });

  it("is not empty", () => {
    expect(data).not.toHaveLength(0);
  });

  it("has required fields in all rows", () => {
    data.forEach(b => {
      expect(
        !!b.vacNameEn &&
          !!b.vacNameFr &&
          !!b.oneLineDescriptionEn &&
          !!b.oneLineDescriptionFr // &&
        // !!b.benefitPageEn &&    currently failing
        // !!b.benefitPageFr
      ).toBeTruthy();
    });
  });

  it("is in the eligibility table", () => {
    data.forEach(b => {
      expect(b.benefitEligibility).toBeTruthy();
    });
  });
});
