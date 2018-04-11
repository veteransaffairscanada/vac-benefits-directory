describe("Test POC", function() {
  it("Test Get English Page", function() {
    cy.visit("");
    cy.contains("Proof of Concept");
  });

  it("Test English -> French button", function() {
    cy.visit("");
    cy.contains("Proof of Concept");
    cy.contains("Français").click();
    cy.contains("Ceci est une preuve de concept pour le projet ACC");
  });
});
