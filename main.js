const domInpTodoTitle = document.getElementById("inpTodoTitle");
const domBtnCreateTodo = document.getElementById("btnCreateTodo");
const domListOfTodos = document.getElementById("listOfTodos");

domBtnCreateTodo.addEventListener("click", onBtnCreateTodoClick);

class TodoVO {
    constructor(id, title, date = new Date()) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.isCompleted = false;
    }
}

const listOfTodos = [];

function onBtnCreateTodoClick(event) {
    console.log("> domBtnCreateTodo -> handle(click)", event);
    const todoTitleValueFromDomInput = domInpTodoTitle.value;
    console.log("> domBtnCreateTodo -> todoInputTitleValue:", todoTitleValueFromDomInput);

    console.log("> domBtnCreateTodo -> isInputValueNotNumber");

    const canCreateTodo = validateTodoInputTitleValue(todoTitleValueFromDomInput);

    if (canCreateTodo) {
        console.log("> domBtnCreateTodo -> canCreateTodo");

    const todoVO = createTodoVO(todoTitleValueFromDomInput);

    listOfTodos.push(todoVO);
    let output = "";
    for (let index in listOfTodos) {
        output += `<li>${listOfTodos[index].title}</li>`;
    }
    domListOfTodos.innerHTML = output;
}

    function validateTodoInputTitleValue (value) {
        const isInputValueString = typeof value === 'string';
        const isInputValueNotNumber = isNaN(parseInt(value));
        const result =
            isInputValueString
            &&  isInputValueNotNumber
            &&  value.length > 0;

        console.log('> validateTodoInputTitleValue ->result', {
            result,
            isInputValueString,
            isInputValueNotNumber
        });
        return result;
    }
    function createTodoVO(title) {
        const todoId = Date.now().toString();
        const todoVO = new TodoVO(todoId, title);
        return todoVO

    }}