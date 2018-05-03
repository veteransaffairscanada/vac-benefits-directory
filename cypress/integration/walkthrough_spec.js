const baseURL = "http://localhost:3000/A";

describe("Wireframe A", () => {
  it("starts on A1", () => {
    cy.visit(baseURL);
    cy.get("#A1");
  });

  it("can go from A1 to A2", () => {
    cy.visit(baseURL);
    cy.contains("Next").click();
    cy.get("#A1").should("not.exist");
    cy.get("#A2");
    cy.url().should("contain", "section=A2");
  });

  it("can go from A2 to A3", () => {
    cy.visit(baseURL + "?section=A2");
    cy.contains("See Results").click();
    cy.get("#A2").should("not.exist");
    cy.get("#A3");
    cy.url().should("contain", "section=A3");
  });

  it("can go from A3 to A1", () => {
    cy.visit(baseURL + "?section=A3");
    cy.get("#vacServicesCard").within(() => {
      cy.get("#ChangeButton").click();
    });
    cy.get("#A1");
    cy.url().should("contain", "section=A1");
  });

  it("can go from A3 to A2", () => {
    cy.visit(baseURL + "?section=A3");
    cy.get("#userStatusesCard").within(() => {
      cy.get("#ChangeButton").click();
    });
    cy.get("#A2");
    cy.url().should("contain", "section=A2");
  });

  it("can go from A1 to All Benefits", () => {
    cy.visit(baseURL);
    cy
      .get(".AllBenefits")
      .invoke("removeAttr", "target")
      .click();
    cy.get(".allBenefitsList");
  });

  it("can go from A2 to All Benefits", () => {
    cy.visit(baseURL + "?section=A2");
    cy
      .get(".AllBenefits")
      .invoke("removeAttr", "target")
      .click();
    cy.get(".allBenefitsList");
  });

  it("can go from A3 to All Benefits", () => {
    cy.visit(baseURL + "?section=A3");
    cy
      .get(".AllBenefits")
      .invoke("removeAttr", "target")
      .click();
    cy.get(".allBenefitsList");
  });
});
