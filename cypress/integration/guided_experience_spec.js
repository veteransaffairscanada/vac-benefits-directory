const patronTypeVeteran = "benefits for Veterans,";
const serviceTypeCAF = "Canadian Armed Forces";

describe("Guided Experience", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully loads start page", () => {
    cy.contains("Are you looking for:");
  });

  it("can skip through to benefits-directory", () => {
    cy.get("#a-skipButton").click();
    cy.url().should("include", "needs");
    cy.get("#a-skipButton").click();
    cy.url().should("include", "benefits-directory");
  });

  it("can choose some options and get to benefits directory", () => {
    cy.contains(patronTypeVeteran).click();
    cy.get("#nextButton").click();
    cy.url().should("include", "serviceType?");
    cy.contains(serviceTypeCAF).click();
    cy.get("#nextButton").click();
    cy.url().should("include", "needs");
    cy.get("#nextButton").click();
    cy.url().should("include", "benefits-directory");
    cy.contains(patronTypeVeteran);
  });
});
