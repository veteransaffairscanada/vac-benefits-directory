const baseURL = "http://localhost:3000/A";

describe("Page A", () => {
  beforeEach(() => {
    cy.visit(baseURL);
  });

  it("Has a language button that works", () => {
    cy.contains("Veteran Affairs Canada");
    cy.contains("Anciens Combattants Canada").should("not.exist");
    cy.contains("Français").click();
    cy.contains("Anciens Combattants Canada");
  });
});
