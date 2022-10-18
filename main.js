import TodoVO from './src/model/vos/TodoVO.js';

const domInpTodoTitle = document.getElementById('inpTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);
domInpTodoTitle.addEventListener('keyup', onInpTodoTitleKeyup);

const LOCAL_LIST_OF_TODOS = 'listOfTodos';

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

console.log('> listOfTodos', listOfTodos);

renderTodoListInContainer(listOfTodos, domListOfTodos);
disabledButtonWhenTextInvalid(domBtnCreateTodo, domInpTodoTitle.value);

function onBtnCreateTodoClick(event) {
  console.log('> domBtnCreateTodo -> handle(click)', event);
  const todoTitleValueFromDomInput = domInpTodoTitle.value;
  // console.log('> domBtnCreateTodo -> todoInputTitleValue:', todoTitleValueFromDomInput);
  // console.log('> domBtnCreateTodo -> isInputValueNotNumber');
  if (validateIsStringNotNumberValue(todoTitleValueFromDomInput)) {
    // console.log('> domBtnCreateTodo -> canCreateTodo');
    listOfTodos.push(createTodoVO(todoTitleValueFromDomInput));
    localStorage.setItem(LOCAL_LIST_OF_TODOS, JSON.stringify(listOfTodos));
    renderTodoListInContainer(listOfTodos, domListOfTodos);
    disabledButtonWhenTextInvalid(domBtnCreateTodo, inputValue);
  }
}

function onInpTodoTitleKeyup(event) {
  console.log('onInpTodoTitleKeyup', event);
  const inputValue = event.currentTarget.value;
  console.log('onInpTodoTitleKeyup', inputValue);
  disabledButtonWhenTextInvalid(domBtnCreateTodo, inputValue);
}
function disabledButtonWhenTextInvalid(button, text, validateTextFunction, { textWhenDisabled, textWhenEnabled } = {}) {
  if (!validateTextFunction) throw new Error('Validate method must be defined');

  if (validateTextFunction(text)) {
    button.disabled = false;
    button.textContent = 'Create';
  } else {
    button.disabled = true;
    button.textContent = 'Enter text';
  }
}

function validateIsStringNotNumberValue(value) {
  const isInputValueString = typeof value === 'string';
  const isInputValueNotNumber = isNaN(parseInt(value));
  const result = isInputValueString && isInputValueNotNumber && value.length > 0;

  console.log('> validateIsStringNotNumberValue ->result', {
    result,
    isInputValueString,
    isInputValueNotNumber,
  });
  return result;
}

function localStorageListOf(key) {
  const value = localStorage.getItem(key);
  console.log('localStorageListOf: value=', value);
  if (value == null) return [];

  const parsedValue = JSON.parse(value);
  const isParsedValueArray = Array.isArray(value);
  return isParsedValueArray ? parsedValue : [];
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
