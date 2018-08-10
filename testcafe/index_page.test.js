import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";

const BDSelector = Selector("#BB");
const serviceMemberSelector = Selector("input").withAttribute(
  "value",
  "service-person"
);
const CAFSelector = Selector("input").withAttribute("value", "CAF");
const releasedSelector = Selector("input").withAttribute(
  "value",
  "releasedAlive"
);
const healthIssueSelector = Selector("input").withAttribute("value", "true");
const firstNeedSelector = Selector("button").nth(4);

fixture("Guided Experience")
  .page("http://localhost:3000/")
  .beforeEach(async () => {
    await waitForReact();
  });

test("Can click throught GE and get to BD", async t => {
  await t
    .click("#heroGuidedLink")
    .click(serviceMemberSelector)
    .click("#nextButton")
    .click(CAFSelector)
    .click("#nextButton")
    .click(releasedSelector)
    .click("#nextButton")
    .click(healthIssueSelector)
    .click("#nextButton")
    .click(firstNeedSelector)
    .click("#nextButton")
    .expect(BDSelector.exists)
    .ok();
});
