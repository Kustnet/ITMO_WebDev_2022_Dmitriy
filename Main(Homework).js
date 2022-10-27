let domInpFirstName = document.querySelector('.inpFirstName');
let domInpLastName = document.querySelector('.inpLastName');

domInpFirstName.addEventListener('keyup', firstNameTitle);
domInpLastName.addEventListener('keyup', lastNameTitle);

function firstNameTitle() {
  const firstName = document.querySelector('.inpFirstName').value;
  document.querySelector('.FName').innerHTML = firstName;
  console.log(firstName);
}
function lastNameTitle() {
  const lastName = document.querySelector('.inpLastName').value;
  document.querySelector('.LName').innerHTML = lastName;
  console.log(lastName);
}
