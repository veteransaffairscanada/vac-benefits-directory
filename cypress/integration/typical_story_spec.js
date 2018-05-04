describe("Wireframe A example story", () => {
  it("works", () => {
    cy.visit("A?use_testdata=true");
    cy.contains("Compensation For Harm").click();
    cy.contains("Healthcare Cost Coverage").click();
    cy.contains("Next").click();
    cy.contains("Military Service-Person").click();
    cy.contains("See Results").click();
    cy.contains("Disability Award");
    cy.contains("Disability Pension").should("not.exist");
    cy.get("#userStatusesCard").within(() => {
      cy.get("#ChangeButton").click();
    });
    cy.contains("RCMP Service-Person").click();
    cy.contains("See Results").click();
    cy.contains("Disability Award");
    cy.contains("Disability Pension");
  });
});
