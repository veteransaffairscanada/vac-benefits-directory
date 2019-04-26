import fs from "fs";

describe("Next steps data", () => {
  let data;
  beforeEach(() => {
    data = JSON.parse(fs.readFileSync("data/data.json")).nextSteps;
  });

  it("is not empty", () => {
    expect(data).not.toHaveLength(0);
  });
});
