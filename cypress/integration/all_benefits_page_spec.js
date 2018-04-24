describe("All benefits page", function() {
  it("Shows all the benefits in English", function() {
    cy.visit("http://localhost:3000/all-benefits");
    cy.contains("Disability Award");
  });

  it("Shows all benefits in French", function() {
    cy.visit("http://localhost:3000/all-benefits?lng=fr");
    cy.contains("Prix ​​d'invalidité");
  });
});
