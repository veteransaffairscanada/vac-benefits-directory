const baseURL = "http://localhost:3000/A";

const benefitTypesURL =
  "https://api.airtable.com/v0/appIjjOxIa2utbHGH/benefit_types?maxRecords=100&view=Grid%20view";
const benefitTypesFixture = {
  records: [
    {
      id: "rec3PfnqeqyxSbx1x",
      fields: {
        name_fr: " Compensation Pour Préjudice",
        benefits: ["recQtMLSsyS90o4rV", "recvzRaT9ormprNkb"],
        name_en: "Compensation For Harm",
        id: "rec3PfnqeqyxSbx1x"
      },
      createdTime: "2018-04-11T15:28:26.000Z"
    }
  ]
};

describe("Spy / Stub", () => {
  describe("Spying", () => {
    beforeEach(() => {
      cy.visit(baseURL, {
        onBeforeLoad(win) {
          cy.spy(win, "fetch");
        }
      });
    });

    it("Requests Benefit Types from Airtable", () => {
      cy.contains("What services are you interested in?");
      cy
        .window()
        .its("fetch")
        .should("be.calledWith", benefitTypesURL);
    });
  });

  describe("Stubbing", () => {
    let fetchBTDeferred;

    beforeEach(() => {
      fetchBTDeferred = deferred();
      cy.visit(baseURL, {
        onBeforeLoad(win) {
          cy
            .stub(win, "fetch")
            .withArgs(benefitTypesURL)
            .as("fetchBT")
            .returns(fetchBTDeferred.promise);
        }
      });
    });

    it("Requests Benefit Types from Airtable", () => {
      cy.get("@fetchBT").should("be.calledWith", benefitTypesURL);
    });

    describe("When Airtable returned a Benefit Type", function() {
      beforeEach(function() {
        fetchBTDeferred.resolve({
          json: () => {
            return benefitTypesFixture;
          },
          ok: true
        });
      });

      it("Has a Benefit Type button", function() {
        cy.get("#rec3PfnqeqyxSbx1x");
      });

      it("Can add Benefit Type to url", function() {
        cy.get("#rec3PfnqeqyxSbx1x").click();
        cy.contains("Next").click();
        cy
          .url()
          .should(
            "equal",
            baseURL +
              "?section=A2&selectedBenefitTypes=rec3PfnqeqyxSbx1x&selectedPatronTypes="
          );
      });
    });
  });

  function deferred() {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });
    return deferred;
  }
});
