const baseURL = "http://localhost:3000/A";

describe("Section A1", () => {
  beforeEach(() => {
    cy.visit(baseURL + "?section=A1");
  });

  it("Has an All Benefits link", () => {
    cy
      .get(".AllBenefits")
      .should("have.attr", "href")
      .and("include", "all-benefits");
    cy
      .get(".AllBenefits")
      .invoke("removeAttr", "target")
      .click();
    cy.get(".allBenefitsList");
  });

  it("Next button goes to A2", () => {
    cy.contains("Next").click();
    cy
      .url()
      .should(
        "equal",
        baseURL + "?section=A2&selectedBenefitTypes=&selectedPatronTypes="
      );
    cy.contains("What best describes your status?");
  });
});
