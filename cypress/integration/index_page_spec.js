const patronTypeVeteran = "Benefits for Veterans";
const serviceTypeCAF = "Canadian Armed Forces";

const skipButtonText = "Skip question";
const nextButtonText = "Next";

describe("Index page", function() {
  it("successfully loads", () => {
    cy.visit("/");
  });

  it("can skip through to summary", () => {
    cy.visit("/");
    cy.contains(skipButtonText).click();
    cy.contains(skipButtonText).click();
    cy.url().should("include", "summary");
  });

  it("can choose some options and get to summary and benefits directory", () => {
    cy.visit("/");
    cy.contains(patronTypeVeteran).click({ force: true });
    cy.contains(nextButtonText).click({ force: true });
    cy.contains(serviceTypeCAF).click({ force: true });
    cy.contains(nextButtonText).click({ force: true });
    cy.contains("Yes").click({ force: true });
    cy.contains(nextButtonText).click({ force: true });
    cy.contains(nextButtonText).click({ force: true });
    cy.url().should("include", "summary");
    cy.contains(patronTypeVeteran);
    cy.contains("Show results").click({ force: true });
    cy.url().should("include", "benefits-directory");
  });

  it("can go back from summary and edit answer", () => {
    cy.visit("/");
    cy.contains(patronTypeVeteran).click();
    cy.contains(nextButtonText).click();
    cy.contains(skipButtonText).click();
    cy.contains(skipButtonText).click();
    cy.contains("Edit").click();
    cy.contains("Select who will be receiving the benefits.");
  });
});
