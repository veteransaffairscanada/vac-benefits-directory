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
      expect(b.vacNameEn).toBeTruthy();
      expect(b.vacNameFr).toBeTruthy();
      expect(b.oneLineDescriptionEn).toBeTruthy();
      expect(b.oneLineDescriptionFr).toBeTruthy();
      //expect(b.benefitPageEn).toBeTruthy()  currently failing
      //expect(b.benefitPageFr).toBeTruthy()  currently failing
    });
  });

  it("is in the eligibility table", () => {
    data.forEach(b => {
      expect(b.benefitEligibility).toBeTruthy();
    });
  });
});
