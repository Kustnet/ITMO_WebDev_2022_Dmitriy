const domBtnPlus = document.getElementById('btnAddWorkItem');
const domBtnClose = document.getElementById('btnCloseWorkItemPopup');
const popup = document.getElementById('popup');
const domInputQty = document.getElementById('inputWorkItemQty');
const domInputCost = document.getElementById('inputWorkItemCost');
const domItem = document.getElementById('workItemTotalContainer');
// console.log(domInputQty);
domBtnPlus.addEventListener('click', onBtnOpenAddWorkItem);
domBtnClose.addEventListener('click', onBtnCloseAddWorkItem);
domInputQty.addEventListener('input', totalItem);
domInputCost.addEventListener('input', totalItem);

function onBtnOpenAddWorkItem() {
  popup.style.display = 'block';
}
function onBtnCloseAddWorkItem() {
  popup.style.display = 'none';
}

function totalItem() {
  const qty = domInputQty.value;
  // console.log(typeof domInputQty.value, domInputQty.value);
  localStorage.setItem('domInputQty', document.getElementById('inputWorkItemQty').value);
  const cost = domInputCost.value;
  // console.log(typeof domInputCost.value, domInputCost.value);
  localStorage.setItem('domInputCost', document.getElementById('inputWorkItemCost').value);

  if (!isNaN(qty || cost)) {
    let total = qty * cost;
    domItem.innerHTML = total;
    console.log(total);
    localStorage.setItem('domItem', total);
  } else {
    alert('Нужно писать число!');
  }
}

// let val = document.getElementById('inputWorkItemQty').value;
// localStorage.setItem('inputWorkItemQty', val);
// console.log('LOG', domInputQty);
// localStorage.setItem('localStorageNick', document.getElementById('inputWorkItemQty').value);

// const qtyLocalStorage = localStorage.getItem();
// console.log(domInputQty.value);
function localStorageSave(key, value) {
  localStorage.setItem(key, value);
}
// localStorageSave('domInputQty', domInputQty.value);

class todoItem {
  constructor(qty, cost, total, workItem, description) {
    this.qty = qty;
    this.cost = cost;
    this.total = total;
    this.workItem = workItem;
    this.description = description;
  }
}
new todoItem(domInputQty.value, domInputCost.value, domItem.value);
{
  const a = document.createElement();
  document.getElementById(inputWorkItemCost).appendChild(a);
}
