import fs from "fs";

describe("Question clear logic data", () => {
  let data;
  beforeEach(() => {
    data = JSON.parse(fs.readFileSync("data/data.json")).questionClearLogic;
  });

  it("is not empty", () => {
    expect(data).not.toHaveLength(0);
  });
});
