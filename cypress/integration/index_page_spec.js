const patronTypeVeteran = "Benefits for Veterans";
const serviceTypeCAF = "Canadian Armed Forces";

const skipButtonText = "Skip question";
const nextButtonText = "Next";

describe("Index page", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully loads", () => {
    cy.contains("Select who will be receiving the benefits.");
  });

  it("can skip through to summary", () => {
    cy.contains(skipButtonText).click();
    cy.url().should("include", "needs");
    cy.contains(skipButtonText).click();
    cy.url().should("include", "summary");
  });

  it("can choose some options and get to summary and benefits directory", () => {
    cy.contains(patronTypeVeteran).click();
    cy.contains(nextButtonText).click();
    cy.url().should("include", "serviceType?");
    cy.contains(serviceTypeCAF).click();
    cy.contains(nextButtonText).click();
    cy.url().should("include", "serviceHealthIssue?");
    cy.contains("Yes").click();
    cy.contains(nextButtonText).click();
    cy.url().should("include", "needs");
    cy.contains(nextButtonText).click();
    cy.url().should("include", "summary");
    cy.contains(patronTypeVeteran);
    cy.contains("Show results").click();
    cy.url().should("include", "benefits-directory");
  });

  it("can go back from summary and edit answer", () => {
    cy.visit("summary");
    cy.contains("Edit").click();
    cy.contains("Select who will be receiving the benefits.");
  });
});
