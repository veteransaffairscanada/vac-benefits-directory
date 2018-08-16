import { Selector } from "testcafe";
import { waitForReact, ReactSelector } from "testcafe-react-selectors";

const languageButton = Selector("#changeLanguage");
const guidedExperienceButton = Selector("#heroGuidedLink");
const benefitsDirectoryButton = Selector("#heroBenefitsLink");
const favouritesPageButton = Selector("#FavouritesPage");
const searchButton = Selector("#searchButtonLink");
const searchField = Selector("#inputField");
const guidedExperience = Selector("#guidedExperience");
const benefitsDirectory = Selector("#BB");
const benefitsDirectorySearchField = Selector("#bbSearchField");
const favouritesPage = Selector("#favourites");

fixture("Index page")
  .page("http://localhost:3000/")
  .beforeEach(async () => {
    await waitForReact();
  });

test("French button changes i18n language", async t => {
  const initialI18nState = await ReactSelector("I18n").getReact();
  const initialLanguage = initialI18nState.props.i18n.language;

  await t.click(languageButton);
  const i18nState = await ReactSelector("I18n").getReact();
  await t.expect(i18nState.props.i18n.language).notEql(initialLanguage);
});

test("Can click to the guided experience", async t => {
  await t
    .click(guidedExperienceButton)
    .expect(guidedExperience.exists)
    .ok();
});

test("Can click to the benefits directory", async t => {
  await t
    .click(benefitsDirectoryButton)
    .expect(benefitsDirectory.exists)
    .ok();
});

test("Can click to the favourites page", async t => {
  await t
    .click(favouritesPageButton)
    .expect(favouritesPage.exists)
    .ok();
});

test("Clicking search button goes to benefits directory", async t => {
  await t
    .typeText(searchField, "disability")
    .click(searchButton)
    .expect(benefitsDirectory.exists)
    .ok()
    .expect(benefitsDirectorySearchField.value)
    .eql("disability");
});

test("Hitting return in search box goes to benefits directory", async t => {
  await t
    .typeText(searchField, "disability")
    .pressKey("enter")
    .expect(benefitsDirectory.exists)
    .ok()
    .expect(benefitsDirectorySearchField.value)
    .eql("disability");
});
