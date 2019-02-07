import fs from "fs";

describe("Multiple choice options data", () => {
  let data;
  beforeEach(() => {
    data = JSON.parse(fs.readFileSync("data/data.json")).multipleChoiceOptions;
  });

  it("is not empty", () => {
    expect(data).not.toHaveLength(0);
  });
});
