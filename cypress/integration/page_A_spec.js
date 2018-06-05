const baseURL = "http://localhost:3000/A";

describe("Page A", () => {
  beforeEach(() => {
    cy.visit(baseURL);
  });

  it("Loads A1", () => {
    cy.contains("Filter Benefits");
  });

  it("Has a language button", () => {
    cy.contains("Filter by eligibility");
    cy.contains("Filtrer par admissibilité").should("not.exist");
    cy.contains("Français").click();
    cy.contains("Filtrer par admissibilité");
  });
});
