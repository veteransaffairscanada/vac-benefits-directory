const baseURL = "http://localhost:3000/A";

describe("Section A3", function() {
  beforeEach(() => {
    cy.visit(baseURL + "?section=A3");
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

  it("Has a button to A1", () => {
    cy.get("#vacServicesCard").within(() => {
      cy.get("#ChangeButton").click();
      cy.url().should("contain", "section=A1");
    });
  });

  it("Has a button to A2", () => {
    cy.get("#userStatusesCard").within(() => {
      cy.get("#ChangeButton").click();
      cy.url().should("contain", "section=A2");
    });
  });
});
