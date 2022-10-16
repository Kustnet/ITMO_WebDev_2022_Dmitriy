import TodoVO from './src/model/vos/TodoVO.js';

const domInpTodoTitle = document.getElementById('inpTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);
const LOCAL_LIST_OF_TODOS = 'listOfTodos';

const localListOfTodos = localStorage.getItem(LOCAL_LIST_OF_TODOS);
const listOfTodos = localListOfTodos != null ? JSON.parse(localListOfTodos) : [];

console.log('> listOfTodos', listOfTodos);

renderTodoListInContainer(listOfTodos, domListOfTodos);

function onBtnCreateTodoClick(event) {
  // console.log('> domBtnCreateTodo -> handle(click)', event);
  const todoTitleValueFromDomInput = domInpTodoTitle.value;
  // console.log('> domBtnCreateTodo -> todoInputTitleValue:', todoTitleValueFromDomInput);
  // console.log('> domBtnCreateTodo -> isInputValueNotNumber');
  if (validateTodoInputTitleValue(todoTitleValueFromDomInput)) {
    // console.log('> domBtnCreateTodo -> canCreateTodo');
    listOfTodos.push(createTodoVO(todoTitleValueFromDomInput));
    localStorage.setItem(LOCAL_LIST_OF_TODOS, JSON.stringify(listOfTodos));
    renderTodoListInContainer(listOfTodos, domListOfTodos);
  }
}

function validateTodoInputTitleValue(value) {
  const isInputValueString = typeof value === 'string';
  const isInputValueNotNumber = isNaN(parseInt(value));
  const result = isInputValueString && isInputValueNotNumber && value.length > 0;

  console.log('> validateTodoInputTitleValue ->result', {
    result,
    isInputValueString,
    isInputValueNotNumber,
  });
  return result;
}

function createTodoVO(title) {
  const todoId = Date.now().toString();
  const todoVO = new TodoVO(todoId, title);
  return todoVO;
}

function renderTodoListInContainer(list, container) {
  let output = '';
  for (let index in list) {
    output += `<li>${list[index].title}</li>`;
  }
  container.innerHTML = output;
}
