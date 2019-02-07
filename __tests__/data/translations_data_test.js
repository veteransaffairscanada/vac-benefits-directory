import fs from "fs";

describe("Translations data", () => {
  let data;
  beforeEach(() => {
    data = JSON.parse(fs.readFileSync("data/data.json")).translations;
  });

  it("is not empty", () => {
    expect(data).not.toHaveLength(0);
  });

  it("has required fields in all rows", () => {
    data.forEach(t => {
      expect(t.key).toBeTruthy();
      expect(t.English).toBeTruthy();
      expect(t.French).toBeTruthy();
    });
  });
});
