import { Selector } from "testcafe";
import { waitForReact, ReactSelector } from "testcafe-react-selectors";

const serviceMemberRadioButton = Selector("input").withAttribute(
  "value",
  "service-person"
);
const organizationsRadioButton = Selector("input").withAttribute(
  "value",
  "organization"
);
const CAFRadioButton = Selector("input").withAttribute("value", "CAF");
const releasedRadioButton = Selector("input").withAttribute(
  "value",
  "releasedAlive"
);
const healthIssueRadioButton = Selector("input").withAttribute("value", "true");
const needButton = Selector("button").nth(4);
const nextButton = Selector("#nextButton");
const benefitsDirectoryScreen = Selector("#BB");
const needsScreen = ReactSelector("GuidedExperienceNeeds");

fixture("Guided Experience")
  .page("http://localhost:3000/A")
  .beforeEach(async () => {
    await waitForReact();
  });

test("Can click throught and get to the benefits directory", async t => {
  await t
    .click(serviceMemberRadioButton)
    .click(nextButton)
    .click(CAFRadioButton)
    .click(nextButton)
    .click(releasedRadioButton)
    .click(nextButton)
    .click(healthIssueRadioButton)
    .click(nextButton)
    .click(needButton)
    .click(nextButton)
    .expect(benefitsDirectoryScreen.exists)
    .ok();
});

test("Choosing Organizations goes directly to benefits directory", async t => {
  await t
    .click(organizationsRadioButton)
    .click(nextButton)
    .expect(benefitsDirectoryScreen.exists)
    .ok();
});

test("Skipping all profile question leads to needs", async t => {
  await t
    .click(nextButton)
    .expect(needsScreen.exists)
    .ok();
});

test("Skipping all but 1 profile question leads to needs", async t => {
  await t
    .click(serviceMemberRadioButton)
    .click(nextButton)
    .click(nextButton)
    .expect(needsScreen.exists)
    .ok();
});
