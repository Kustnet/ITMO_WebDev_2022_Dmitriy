const domBtnPlus = document.getElementById('btnAddWorkItem');
const domBtnClose = document.getElementById('btnCloseWorkItemPopup');
const popup = document.getElementById('popup');
const domInputQty = document.getElementById('inputWorkItemQty');
const domInputCost = document.getElementById('inputWorkItemCost');
const domItem = document.getElementById('workItemTotalContainer');
const domWorkItem = document.getElementById('inputWorkItemTitle');
const domDescription = document.getElementById('inputWorkItemDescription');

// popup total and save  to localStorage;
domBtnPlus.addEventListener('click', onBtnOpenAddWorkItem);
domBtnClose.addEventListener('click', onBtnCloseAddWorkItem);
domInputQty.addEventListener('input', totalItemAndSaveLocalStorage);
domInputCost.addEventListener('input', totalItemAndSaveLocalStorage);
domWorkItem.addEventListener('keyup', totalItemAndSaveLocalStorage);
domDescription.addEventListener('keyup', totalItemAndSaveLocalStorage);

function onBtnOpenAddWorkItem() {
  popup.style.display = 'block';
}
function onBtnCloseAddWorkItem() {
  popup.style.display = 'none';
}

function totalItemAndSaveLocalStorage() {
  const qty = domInputQty.value;
  // console.log(typeof domInputQty.value, domInputQty.value);
  localStorage.setItem('domInputQty', domInputQty.value);
  const cost = domInputCost.value;
  // console.log(typeof domInputCost.value, domInputCost.value);
  localStorage.setItem('domInputCost', domInputCost.value);
  localStorage.setItem('domWorkItem', domWorkItem.value);
  localStorage.setItem('domDescription', domDescription.value);
  if (!isNaN(qty || cost)) {
    let total = qty * cost;
    domItem.innerHTML = total;
    console.log(total);
    localStorage.setItem('domItemTotal', total);
  } else {
    alert('Нужно писать число!');
  }
}

// let val = document.getElementById('inputWorkItemQty').value;
// localStorage.setItem('inputWorkItemQty', val);
// console.log('LOG', domInputQty);
const d = localStorage.getItem('domWorkItem');
console.log(d);

class todoItem {
  constructor(qty, cost, total, workItem, description) {
    this.qty = qty;
    this.cost = cost;
    this.total = total;
    this.workItem = workItem;
    this.description = description;
  }
}
const item1 = new todoItem(
  localStorage.getItem('domInputQty'),
  localStorage.getItem('domInputCost'),
  localStorage.getItem('domWorkItem'),
  localStorage.getItem('domItemTotal'),
  localStorage.getItem('domItemTotal')
);

console.log(item1);
{
  const $elem = document.createElement('p');
  const text = document.createTextNode('Я новый текстовый узел');
}
////////////
document.getElementById('div1').onload = addElement;
function addElement() {
  // create a new div element
  const newDiv = document.createElement('div');

  // and give it some content
  const newContent = document.createTextNode('Hi there and greetings!');

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById('div1');
  document.getElementById('div1').insertBefore(newDiv, currentDiv);
}
