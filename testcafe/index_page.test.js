import { Selector } from "testcafe";
// import { waitForReact } from 'testcafe-react-selectors';

const BDSelector = Selector("#BB");

// fixture("Guided Experience").page("https://cdsvacpoc.azurewebsites.net/");

fixture("Guided Experience").page("http://localhost:3000/");
// .beforeEach(async () => {
//   await waitForReact();
// });

test("Can click throught GE and get to BD", async t => {
  await t
    .setPageLoadTimeout(50000)
    .click("#heroGuidedLink")
    .click("#nextButton")
    .click("#nextButton")
    .expect(BDSelector.exists)
    .ok();
});
