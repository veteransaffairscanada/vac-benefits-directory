import fs from "fs";

describe("Benefit eligibility data", () => {
  let data;
  beforeEach(() => {
    data = JSON.parse(fs.readFileSync("data/data.json")).benefitEligibility;
  });

  it("is not empty", () => {
    expect(data).not.toHaveLength(0);
  });
});
