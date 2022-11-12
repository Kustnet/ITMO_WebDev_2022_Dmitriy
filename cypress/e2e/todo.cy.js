import DOM from '../../src/consts/dom.js';

describe('empty spec', () => {
  before(() => {
    cy.visit('http://localhost:8888');
  });
  it('enter todo text as number and check disabled button', () => {
    cy.get('#inpTodoTitle').type(123);
    cy.get('#btnCreateTodo').should('be.disabled');
    cy.get('#inpTodoTitle').clear();
  });

  it('enter todo text and press create', () => {
    const TEST_TODO_TEXT = 'New Todo';
    cy.checkInputExistAndEmpty();

    cy.get('#inpTodoTitle').type(TEST_TODO_TEXT);
    cy.get('#btnCreateTodo').click();
    cy.get('body').then(() => {});

    cy.checkInputExistAndEmpty();

    const todoListChildren = cy.get('#listOfTodos').children();

    todoListChildren.should('exist').should('have.length', 1);
    todoListChildren.first().should('contain.text', TEST_TODO_TEXT);

    const checkChildren = () =>
      cy.get('#listOfTodos > li > input[type="checkbox"]').should('exist').should('have.length', 1);

    checkChildren();

    cy.reload(true);

    checkChildren();
  });
  const createTodo = (text) => {
    cy.get(`#${DOM.INP_TODO_TITLE}`).type(text);
    cy.get(`#${DOM.BTN_CREATE_TODO}`).click();
  };

  it('create todo and validate selection rules', () => {
    ['Todo 1', 'Todo 2'].forEach(createTodo);
    cy.get(`#${DOM.INP_TODO_TITLE}`).clear();
    const clickOnListItemAndCheckInputValueFromFunctionCall = (listItemIndex, getCompareValue) =>
      cy
        .get(`#${DOM.LIST_OF_TODOS}`)
        .children()
        .eq(listItemIndex)
        .click()
        .then(($child) => {
          cy.get(`#${DOM.INP_TODO_TITLE}`).should('have.value', getCompareValue($child));
        });
    const getTextFromTodoItemDomElement = ($child) => $child.text().trim();
    clickOnListItemAndCheckInputValueFromFunctionCall(0, getTextFromTodoItemDomElement)
      .then(() => {
        clickOnListItemAndCheckInputValueFromFunctionCall(0, () => '');
      })
      .then(() => {
        clickOnListItemAndCheckInputValueFromFunctionCall(1, getTextFromTodoItemDomElement);
      });
  });
});
