const baseURL = "http://localhost:3000/A";

describe("Section A2", () => {
  beforeEach(() => {
    cy.visit(baseURL + "?section=A2");
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

  it("See Results button goes to A3", () => {
    cy.contains("See Results").click();
    cy
      .url()
      .should(
        "equal",
        baseURL + "?section=A3&selectedBenefitTypes=&selectedPatronTypes="
      );
    cy.contains(
      "At this time there are no benefits that match your selections."
    );
  });
});
