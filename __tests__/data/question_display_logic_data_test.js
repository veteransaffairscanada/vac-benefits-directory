import fs from "fs";

describe("Question display logic data", () => {
  let data;
  beforeEach(() => {
    data = JSON.parse(fs.readFileSync("data/data.json")).questionDisplayLogic;
  });

  it("is not empty", () => {
    expect(data).not.toHaveLength(0);
  });
});
