import fs from "fs";

describe("Translations data", () => {
  let data;
  beforeEach(() => {
    data = JSON.parse(fs.readFileSync("data/data.json")).translations;
  });

  it("is not empty", () => {
    expect(data).not.toHaveLength(0);
  });
});
