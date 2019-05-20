/// <reference types="Cypress" />
/* eslint-disable no-undef */

describe("list", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render list of items", function() {
    cy.get("#root")
      .find("table tbody td a")
      .should($items => {
        const firstItem = $items.eq(1);
        expect(firstItem).attr("href", "/1/edit");

        const secondItem = $items.eq(3);
        expect(secondItem).attr("href", "/2/edit");
      });
  });
});
