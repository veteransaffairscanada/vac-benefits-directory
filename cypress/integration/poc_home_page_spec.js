describe("Test POC", function() {
  it("Test Get English Page", function() {
    cy.visit("");
    cy.contains(
      "We are here to provide support for Veterans in all phases of their life during or after the military"
    );
  });

  it("Test English -> French button", function() {
    cy.visit("");
    cy.contains(
      "We are here to provide support for Veterans in all phases of their life during or after the military"
    );
    cy.contains("Français").click();
    cy.contains(
      "Nous sommes ici pour offrir du soutien aux Vétérans à toutes les étapes de leur vie pendant ou après l'armée"
    );
  });
});
