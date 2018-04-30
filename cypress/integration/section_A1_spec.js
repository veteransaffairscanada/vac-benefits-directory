const baseURL = "http://localhost:3000/A";

describe("Section A1", function() {
  beforeEach(() => {
    cy.visit(baseURL + "?section=A1");
  });

  it("Has an All Benefits link", function() {
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

  it("Next button goes to A2", function() {
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
