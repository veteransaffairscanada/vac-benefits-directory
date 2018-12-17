import { mount } from "enzyme";
import { CardHeaderImportantInfo } from "../../components/card_header_important_info";
import benefitsFixture from "../fixtures/benefits";
const { axe, toHaveNoViolations } = require("jest-axe");
import translate from "../fixtures/translate";
expect.extend(toHaveNoViolations);

describe("CardHeaderImportantInfo", () => {
  let props;
  beforeEach(() => {
    props = {
      t: translate,
      benefit: benefitsFixture[1]
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<CardHeaderImportantInfo {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains the note", () => {
    expect(mount(<CardHeaderImportantInfo {...props} />).text()).toContain(
      benefitsFixture[1].noteEn
    );
  });
});
