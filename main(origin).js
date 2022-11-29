const domBtnPlus = document.getElementById('btnAddWorkItem');
const domBtnClose = document.getElementById('btnCloseWorkItemPopup');
const popup = document.getElementById('popup');
const domInputQty = document.getElementById('inputWorkItemQty');
const domInputCost = document.getElementById('inputWorkItemCost');
const domItem = document.getElementById('workItemTotalContainer');
const domWorkItem = document.getElementById('inputWorkItemTitle');
const domDescription = document.getElementById('inputWorkItemDescription');
const domBtnCreate = document.getElementById('btnCreateWorkItem');
const domSubtotal = document.getElementById('resultsSubtotalContainer');
const containerForWorkItems = document.getElementById('tableWorkItems');
const workItemTemplateSimpleCopy = containerForWorkItems.querySelector('#templateWorkItem');

domBtnPlus.addEventListener('click', onBtnOpenAddWorkItem);
domBtnClose.addEventListener('click', onBtnCloseAddWorkItem);
domInputQty.addEventListener('input', totalItemAndSaveLocalStorage);
domInputCost.addEventListener('input', totalItemAndSaveLocalStorage);
domWorkItem.addEventListener('keyup', totalItemAndSaveLocalStorage);
domDescription.addEventListener('keyup', totalItemAndSaveLocalStorage);
domBtnCreate.addEventListener('click', addItemPopup);

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
  localStorage.setItem('domDescription', domDescription.value);

  if (!isNaN(qty || cost)) {
    let total = qty * cost;
    domItem.innerHTML = total;
    // console.log('> Final total', total);
    localStorage.setItem('domItemTotal', total);
  } else {
    alert('Нужно писать число!');
  }
}
// Заготовка для создания Item через классы
// class todoItem {
//   constructor(qty, cost, total, workItem, description) {
//     this.qty = qty;
//     this.cost = cost;
//     this.total = total;
//     this.workItem = workItem;
//     this.description = description;
//   }
// }
// const item1 = new todoItem(
//   localStorage.getItem('domInputQty'),
//   localStorage.getItem('domInputCost'),
//   localStorage.getItem('domWorkItem'),
//   localStorage.getItem('domItemTotal'),
//   localStorage.getItem('domDescription')
// );

function subtotalDiscountAndTaxes() {
  let subtotal = domSubtotal.innerHTML;
  localStorage.setItem('Subtotal', subtotal);
  const subBefore = localStorage.getItem('Subtotal');
  console.log('>subBefore>', subBefore);
  let total = localStorage.getItem('domItemTotal');
  console.log('>total>', total);
  const subAfter = Number(subBefore) + Number(total);
  console.log('>subAfter>', subAfter);
  domSubtotal.innerHTML = subAfter;

  // доделать добавление налога и скидки
  function discount() {}
  function taxes() {}
}

function addItemPopup() {
  // const item = document.createElement('div');
  // document.getElementById('tableWorkItems').append(item);
  // item.innerText = localStorage.getItem('domWorkItem');
  // const Description = document.createElement('div');
  // item.append(Description);
  // item.style.background = 'lightgray';
  // Description.innerText = localStorage.getItem('domDescription');
  // Description.style.fontSize = '10px';
  //
  //
  // const addItem = document.createElement('div');
  // document.getElementById('tableWorkItems').append(addItem);
  // const item = document.createElement('div');
  // const description = document.createElement('div');
  // const qty = document.createElement('div');
  // const cost = document.createElement('div');
  // const total = document.createElement('div');
  // addItem.append(item, qty, cost, total);
  // item.innerText = localStorage.getItem('domWorkItem');
  // qty.innerText = localStorage.getItem('domInputQty');
  // cost.innerText = localStorage.getItem('domInputCost');
  // total.innerText = localStorage.getItem('domItemTotal');
  // ДЕЛАЕТ ДВОЙНУЮ КОПИЮ ПОСЛЕ ВЫЗОВА ФУНКЦИИ (НАДО ИСПРАВИТЬ)!
  const simpleCopy = workItemTemplateSimpleCopy.cloneNode(true);
  document.getElementById('tableWorkItems').append(simpleCopy);
  // console.log(simpleCopy);
  simpleCopy.querySelector('.title').innerHTML = localStorage.getItem('domWorkItem');
  simpleCopy.querySelector('.description').innerHTML = localStorage.getItem('domDescription');
  simpleCopy.querySelector('.Qty').innerHTML = localStorage.getItem('domInputQty');
  simpleCopy.querySelector('.Cost').innerHTML = localStorage.getItem('domInputCost');
  simpleCopy.querySelector('.total').innerHTML = localStorage.getItem('domItemTotal');
  subtotalDiscountAndTaxes();
  domBtnClose.click();
}
