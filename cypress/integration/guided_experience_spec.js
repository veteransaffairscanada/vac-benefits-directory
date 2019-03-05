const patronTypeVeteran = "Benefits for Veterans";
const serviceTypeCAF = "Canadian Armed Forces";

describe("Guided Experience", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully loads start page", () => {
    cy.contains("Select who would be receiving the benefits.");
  });

  it("can skip through to benefits-directory", () => {
    cy.get("#a-skipButton").click();
    cy.url().should("include", "needs");
    cy.get("#a-skipButton").click();
    cy.url().should("include", "benefits-directory");
  });

  it("can choose some options and get to summary and benefits directory", () => {
    cy.contains(patronTypeVeteran).click();
    cy.get("#nextButton").click();
    cy.url().should("include", "serviceType?");
    cy.contains(serviceTypeCAF).click();
    cy.get("#nextButton").click();
    cy.url().should("include", "serviceHealthIssue?");
    cy.contains("Yes").click();
    cy.get("#nextButton").click();
    cy.url().should("include", "needs");
    cy.get("#nextButton").click();
    cy.url().should("include", "benefits-directory");
    cy.contains(patronTypeVeteran);
  });

  it("can go back from summary and edit answer", () => {
    cy.visit("summary");
    cy.get("#edit-patronType").click();
    cy.contains("Select who would be receiving the benefits.");
  });
});
