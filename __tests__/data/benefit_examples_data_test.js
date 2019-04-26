import fs from "fs";

describe("Benefit examples data", () => {
  let data;
  beforeEach(() => {
    data = JSON.parse(fs.readFileSync("data/data.json")).benefitExamples;
  });

  it("is not empty", () => {
    expect(data).not.toHaveLength(0);
  });
});
