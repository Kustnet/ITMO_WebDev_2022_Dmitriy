const domBtnPlus = document.getElementById('btnAddWorkItem');
const domBtnClose = document.getElementById('btnCloseWorkItemPopup');
const popup = document.getElementById('popup');
const domInputQty = document.getElementById('inputWorkItemQty');
const domInputCost = document.getElementById('inputWorkItemCost');
const domItem = document.getElementById('workItemTotalContainer');
// console.log(domInputQty);
domBtnPlus.addEventListener('click', onBtnOpenAddWorkItem);
domBtnClose.addEventListener('click', onBtnCloseAddWorkItem);
domInputQty.addEventListener('change', totalItem);
domInputCost.addEventListener('change', totalItem);

function onBtnOpenAddWorkItem() {
  popup.style.display = 'block';
}
function onBtnCloseAddWorkItem() {
  popup.style.display = 'none';
}

function totalItem() {
  const qty = domInputQty.value;
  const cost = domInputCost.value;
  if (!isNaN(qty || cost)) {
    const total = qty * cost;
    domItem.innerHTML = total;
    console.log(total);
    return total;
  } else {
    alert('Нужно писать число!');
  }
}
