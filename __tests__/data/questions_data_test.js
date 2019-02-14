import fs from "fs";

describe("Questions data", () => {
  let data;
  beforeEach(() => {
    data = JSON.parse(fs.readFileSync("data/data.json")).questions;
  });

  it("is not empty", () => {
    expect(data).not.toHaveLength(0);
  });
});
