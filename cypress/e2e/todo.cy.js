describe('Test - todo creation', () => {
  before(() => {});

  it('inter index page enter todo text and press create', () => {
    cy.visit('http://localhost:8888');
    cy.get('#inpTodoTitle').should('exist');
    cy.get('#inpTodoTitle').should('contain.text');
  });
});
