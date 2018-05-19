const baseURL = "http://localhost:3000/A";

describe("Page A", () => {
  beforeEach(() => {
    cy.visit(baseURL);
  });

  it("Loads A1", () => {
    cy.contains("Filter Benefits");
  });

  it("Has a language button", () => {
    cy.contains("Filter Benefits");
    cy.contains("Filtrer les avantages").should("not.exist");
    cy.contains("Français").click();
    cy.contains("Filtrer les avantages");
  });
});
