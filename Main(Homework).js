let domInpFirstName = document.querySelector('.inpFirstName');
let domInpLastName = document.querySelector('.inpLastName');

domInpFirstName.addEventListener('keyup', (event) => {
  const firstName = document.querySelector('.inpFirstName').value;
  document.querySelector('.FName').innerHTML = firstName;
  console.log(firstName);
});

domInpLastName.addEventListener('keyup', (event) => {
  const lastName = document.querySelector('.inpLastName').value;
  document.querySelector('.LName').innerHTML = lastName;
  console.log(lastName);
});
