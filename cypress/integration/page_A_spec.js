const baseURL = "http://localhost:3000/A";

describe("Page A", () => {
  beforeEach(() => {
    cy.visit(baseURL);
  });

  it("Loads A1", () => {
    cy.contains("What services are you interested in?");
  });

  it("Has a language button", () => {
    cy.contains("What services are you interested in?");
    cy.contains("Quels services vous intéressent?").should("not.exist");
    cy.contains("Français").click();
    cy.contains("Quels services vous intéressent?");
  });
});
