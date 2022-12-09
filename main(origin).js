import InvoiceVO from './Invoice/InvoiceVO.js';
import WorkItemVO from './Invoice/WorkItemVO.js';

const domBtnPlus = document.getElementById('btnAddWorkItem');
const domBtnClose = document.getElementById('btnCloseWorkItemPopup');
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

const LOCAL_KEY_INVOICE = 'invoice';

const invoiceVO = JSON.parse(localStorage.getItem(LOCAL_KEY_INVOICE)) || new InvoiceVO();
let selectedWorkItemVO = null;

domInpInvoiceNumber.addEventListener('input', () => {
  invoiceVO.id = domInpInvoiceNumber.value;
  saveInvoiceNumberAndIBANInLocalStorage();
});
domInputIBAN.addEventListener('input', () => {
  saveInvoiceNumberAndIBANInLocalStorage();
});
domBtnPlus.addEventListener('click', onBtnOpenAddWorkItem);
domBtnClose.addEventListener('click', onBtnCloseAddWorkItem);
domInputQty.addEventListener('input', totalItemAndSaveLocalStorage);
domInputCost.addEventListener('input', totalItemAndSaveLocalStorage);
domWorkItem.addEventListener('keyup', totalItemAndSaveLocalStorage);
domDescription.addEventListener('keyup', totalItemAndSaveLocalStorage);
domBtnCreate.addEventListener('click', addItemPopup);
domDiscountInput.addEventListener('input', discountAndTaxes);
domTaxesInput.addEventListener('input', discountAndTaxes);
// применить функцию InputLimit к другим полям ввода с ограничением 2
domInpInvoiceNumber.oninput = function InputLimit() {
  if (this.value.length > 4) {
    this.value = this.value.slice(0, 4);
  }
};

// Данные сохраняются в SessionStorage
function saveInvoiceNumberAndIBANInLocalStorage() {
  localStorage.setItem('invoice', JSON.stringify(invoiceVO));
  //localStorage.setItem('domInvoiceNumber', domInpInvoiceNumber.value);
  //localStorage.setItem('domIBAN', domInputIBAN.value);
}

const findWorkItemById = (id) => invoiceVO.items.find((vo) => vo.id === id);

function onBtnOpenAddWorkItem(id) {
  // selectedWorkItemVO = id ? findWorkItemById(id) : new WorkItemVO(Date.now().toString());
  popup.style.display = 'block';
  domInputQty.value = '';
  domInputCost.value = '';
  domWorkItem.value = '';
  domDescription.value = '';
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

function addItemPopup() {
  const simpleCopy = workItemTemplateSimpleCopy.cloneNode(true);
  document.getElementById('tableWorkItems').append(simpleCopy);
  // console.log(simpleCopy);
  invoiceVO.items.push(selectedWorkItemVO);

  simpleCopy.id = selectedWorkItemVO.id;
  simpleCopy.querySelector('.title').innerHTML = selectedWorkItemVO.title; //localStorage.getItem('domWorkItem');
  simpleCopy.querySelector('.description').innerHTML = localStorage.getItem('domDescription');
  simpleCopy.querySelector('.Qty').innerHTML = localStorage.getItem('domInputQty');
  simpleCopy.querySelector('.Cost').innerHTML = localStorage.getItem('domInputCost');
  simpleCopy.querySelector('.total').innerHTML = localStorage.getItem('domItemTotal');

  selectedWorkItemVO = null;
  subtotal();
  domBtnClose.click();
  discountAndTaxes();
  saveInvoiceNumberAndIBANInLocalStorage();
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
