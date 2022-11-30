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
const domDiscount = document.getElementById('resultsDiscountContainer');
const domDiscountInput = document.getElementById('inputDiscountPercent');
const domTaxes = document.getElementById('resultsTaxesContainer');
const domTaxesInput = document.getElementById('inputTaxPercent');
const domResults = document.getElementById('resultsTotalContainer');
const containerForWorkItems = document.getElementById('tableWorkItems');
const workItemTemplateSimpleCopy = containerForWorkItems.querySelector('#templateWorkItem');

domBtnPlus.addEventListener('click', onBtnOpenAddWorkItem);
domBtnClose.addEventListener('click', onBtnCloseAddWorkItem);
domInputQty.addEventListener('input', totalItemAndSaveLocalStorage);
domInputCost.addEventListener('input', totalItemAndSaveLocalStorage);
domWorkItem.addEventListener('keyup', totalItemAndSaveLocalStorage);
domDescription.addEventListener('keyup', totalItemAndSaveLocalStorage);
domBtnCreate.addEventListener('click', addItemPopup);
domDiscountInput.addEventListener('input', discountAndTaxes);
domTaxesInput.addEventListener('input', discountAndTaxes);

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
  localStorage.setItem('SubtotalEnd', subAfter);
}
// доделать добавление налога и скидки

function discountAndTaxes() {
  let result = localStorage.getItem('SubtotalEnd');
  let discountResult = result;
  domDiscount.innerHTML = discountResult;
  const discount = Number(domDiscountInput.value);
  console.log(typeof discount, discount);

  if (discount > 0) {
    let percentDis = Math.floor((result / 100) * discount);
    // console.log('>percent>', percent);
    discountResult = result - percentDis;
    domDiscount.innerHTML = discountResult;
    domResults.innerHTML = discountResult;
  } else {
    domDiscount.innerHTML = 0;
    domResults.innerHTML = discountResult;
  }
  const taxes = domTaxesInput.value;
  // if (taxes > 0) {
  let percentTax = Math.floor((discountResult / 100) * taxes);
  domTaxes.innerHTML = Math.ceil(percentTax);
  domResults.innerHTML = discountResult + percentTax;
  // } else {
  //   let percentTax = Math.floor((result / 100) * taxes);
  //   domTaxes.innerHTML = Math.ceil(percentTax);
  //   domResults.innerHTML = Number(result) + Number(percentTax);
  // }
}

function addItemPopup() {
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
  discountAndTaxes();
}
