describe("Fallback tests", function() {
  it("displays fallback screen", () => {
    if (
      Cypress.config("userAgent") ==
      "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)"
    ) {
      it("Visits the page with an incompatible browser (ex. IE < 11)", function() {
        cy.visit("");
        cy.contains(
          "Your current version of this browser is not supported. Please update to the latest version."
        );
      });
    }
  });
});
