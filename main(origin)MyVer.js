const domTitleWorkItem = document.getElementById('titleWorkItemContainer');
const domBtnPlus = document.getElementById('btnAddWorkItem');
const domBtnClose = document.getElementById('btnCloseWorkItemPopup');
const domBtnDelete = document.getElementById('btnDeleteWorkItemPopup');
const popup = document.getElementById('popup');
const domInpInvoiceNumber = document.getElementById('inputInvoiceNumber');
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
const domInputIBAN = document.getElementById('inputIBANNumber');
const containerForWorkItems = document.getElementById('tableWorkItems');
const workItemTemplateSimpleCopy = containerForWorkItems.querySelector('#templateWorkItem');
// let flag = true;

popup.addEventListener('keyup', validateQtyCostDescription);
domInpInvoiceNumber.addEventListener('input', saveInvoiceNumberAndIBANInLocalStorage);
domInputIBAN.addEventListener('input', saveInvoiceNumberAndIBANInLocalStorage);
domBtnPlus.addEventListener('click', onBtnOpenAddWorkItem);
domBtnClose.addEventListener('click', onBtnCloseAddWorkItem);
domInputQty.addEventListener('input', totalItemAndSaveLocalStorage);
domInputCost.addEventListener('input', totalItemAndSaveLocalStorage);
domWorkItem.addEventListener('keyup', totalItemAndSaveLocalStorage);
domDescription.addEventListener('keyup', totalItemAndSaveLocalStorage);
domBtnCreate.addEventListener('click', addWorkItem);
domDiscountInput.addEventListener('input', discountAndTaxes);
domTaxesInput.addEventListener('input', discountAndTaxes);
containerForWorkItems.addEventListener('click', openAndChangeWorkItem);

domInpInvoiceNumber.oninput = (event) => InputLimit(4, event.currentTarget);
domDiscountInput.oninput = (event) => InputLimit(2, event.currentTarget);
domTaxesInput.oninput = (event) => InputLimit(2, event.currentTarget);

function InputLimit(num, input) {
  if (input.value.length > num) {
    input.value = input.value.slice(0, num);
    console.log('InputLimit', input.value);
  }
}

// Данные сохраняются в SessionStorage
function saveInvoiceNumberAndIBANInLocalStorage() {
  localStorage.setItem('domInvoiceNumber', domInpInvoiceNumber.value);
  localStorage.setItem('domIBAN', domInputIBAN.value);
}

function onBtnOpenAddWorkItem() {
  popup.style.display = 'block';
  domInputQty.value = '';
  domInputCost.value = '';
  domWorkItem.value = '';
  domDescription.value = '';
  domTitleWorkItem.innerHTML = 'Add';
  domBtnCreate.innerHTML = 'Create';
  domBtnDelete.disabled = true;
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

function subtotal() {
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
  let percentTax = Math.floor((discountResult / 100) * taxes);
  domTaxes.innerHTML = Math.ceil(percentTax);
  domResults.innerHTML = Number(discountResult) + Number(percentTax);
}

function addWorkItem() {
  const simpleCopy = workItemTemplateSimpleCopy.cloneNode(true);
  document.getElementById('tableWorkItems').append(simpleCopy);
  // console.log(simpleCopy);
  simpleCopy.querySelector('.title').innerHTML = localStorage.getItem('domWorkItem');
  simpleCopy.querySelector('.description').innerHTML = localStorage.getItem('domDescription');
  simpleCopy.querySelector('.Qty').innerHTML = localStorage.getItem('domInputQty');
  simpleCopy.querySelector('.Cost').innerHTML = localStorage.getItem('domInputCost');
  simpleCopy.querySelector('.total').innerHTML = localStorage.getItem('domItemTotal');
  simpleCopy.style.display = '';
  subtotal();
  domBtnClose.click();
  discountAndTaxes();
}
// сохранение данных из инпута в storage---не работает с AddItem
document.addEventListener('DOMContentLoaded', function () {
  // событие загрузки страницы
  // выбираем на странице все элементы типа textarea и input
  document.querySelectorAll('textarea, input').forEach(function (e) {
    // если данные значения уже записаны в sessionStorage, то вставляем их в поля формы
    // путём этого мы как раз берём данные из памяти браузера, если страница была случайно перезагружена
    if (e.value === '') e.value = window.sessionStorage.getItem(e.name, e.value);
    // на событие ввода данных (включая вставку с помощью мыши) вешаем обработчик
    e.addEventListener('input', function () {
      // и записываем в sessionStorage данные, в качестве имени используя атрибут name поля элемента ввода
      window.sessionStorage.setItem(e.name, e.value);
    });
  });
});
function validateQtyCostDescription() {
  if (domInputQty.value !== '' && domInputCost.value !== '' && domWorkItem.value !== '') {
    domBtnCreate.disabled = false;
  } else {
    domBtnCreate.disabled = true;
  }
}

function openAndChangeWorkItem(e) {
  const selectedItem = e.target;
  let domCost = selectedItem.querySelector('.Cost');
  let domQty = selectedItem.querySelector('.Qty');
  let domTitle = selectedItem.querySelector('.title');
  let domDes = selectedItem.querySelector('.description');
  let domTotal = selectedItem.querySelector('.Total');
  domItem.value = domTotal.innerHTML;
  domInputCost.value = domCost.innerHTML;
  domInputQty.value = domQty.innerHTML;
  domWorkItem.value = domTitle.innerHTML;
  domDescription.value = domDes.innerHTML;
  popup.style.display = 'block';
  domTitleWorkItem.innerHTML = 'Update';
  domBtnCreate.innerHTML = 'Save';
  domBtnDelete.disabled = false;
  domBtnDelete.onclick = () => {
    const result = confirm('Are you sure you want to delete: ' + domWorkItem.value + ' ?');
    if (result) {
      let subtotalBef = domSubtotal.innerHTML;
      console.log('domSubtotal.value', subtotalBef);
      console.log('domItem.value', domItem.value);
      let subtotal = Number(subtotalBef) - Number(domItem.value);
      domSubtotal.innerHTML = subtotal;
      localStorage.setItem('SubtotalEnd', subtotal);
      domResults.innerHTML = subtotal;
      discountAndTaxes();
      selectedItem.remove();
      domBtnClose.click();
    }
  };
  if (
    domWorkItem.value === domTitle.innerHTML &&
    domInputQty.value === domQty.innerHTML &&
    domInputCost.value === domCost.innerHTML
  ) {
    domBtnCreate.disabled = true;
  } else {
    domBtnCreate.disabled = false;
  }
  // let flag = false;
  // createOrSaveWorkItem(flag, domTotal, domCost, domQty, domTitle, domDes);
  domBtnCreate.onclick = () => {
    domItem.value = domTotal.innerHTML;
    domInputCost.value = domCost.innerHTML;
    domInputQty.value = domQty.innerHTML;
    domWorkItem.value = domTitle.innerHTML;
    domDescription.value = domDes.innerHTML;
    domBtnClose.click();
  };
}

// function createOrSaveWorkItem() {
//   if (domTitleWorkItem.innerHTML = 'Update') {
//     domBtnCreate.onclick = () => {
//       domItem.value = domTotal.innerHTML;
//       domInputCost.value = domCost.innerHTML;
//       domInputQty.value = domQty.innerHTML;
//       domWorkItem.value = domTitle.innerHTML;
//       domDescription.value = domDes.innerHTML;
//       domBtnClose.click();
//     };
//   } else {
//     const simpleCopy = workItemTemplateSimpleCopy.cloneNode(true);
//     document.getElementById('tableWorkItems').append(simpleCopy);
//     // console.log(simpleCopy);
//     simpleCopy.querySelector('.title').innerHTML = localStorage.getItem('domWorkItem');
//     simpleCopy.querySelector('.description').innerHTML = localStorage.getItem('domDescription');
//     simpleCopy.querySelector('.Qty').innerHTML = localStorage.getItem('domInputQty');
//     simpleCopy.querySelector('.Cost').innerHTML = localStorage.getItem('domInputCost');
//     simpleCopy.querySelector('.total').innerHTML = localStorage.getItem('domItemTotal');
//     simpleCopy.style.display = '';
//     subtotal();
//     domBtnClose.click();
//     discountAndTaxes();
//
//   }
// }
