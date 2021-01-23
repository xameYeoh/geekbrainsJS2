//task 1
const text = "Hello 'User' aren't 'admin'";
console.log(text);
let changed = text.replace(/'/gm, '"');
console.log(changed);
//task2
const text2 = "Hello 'User' and 'admin'";
console.log(text2);
let changed2 = text.replace(/'\s/gm, '" ').replace(/\s'/gm, ' "').replace(/^'|'$/gm, '"');
console.log(changed2);
//task3
let form = document.querySelector(".main-form");
console.log(form);
let submitButton = document.querySelector(".submit-button");
console.log(form.querySelector('[name="name"]'));

function checkForm() {
    let correctName = /\w+/;
    let correctPhone = /^\+7\(\d{3}\)\d{3}-\d{4}/;
    let correctEmail = /[-.\w]+@([\w-]+\.)+[\w-]+/;
    let nameElement = document.querySelector('[name="name"]');
    let phoneElement = document.querySelector('[name="phone"]');
    let emailElement = document.querySelector('[name="email"]');

    if (!correctName.test(nameElement.value)) {
        nameElement.classList.add("error");
        alert("Name field must contain only letters")
        return false;
    } else nameElement.classList.remove("error");
    if (!correctPhone.test(phoneElement.value)) {
        phoneElement.classList.add("error");
        alert("Phone field must be of the exact type: +7(000)000-0000")
        return false;
    } else phoneElement.classList.remove("error");
    if (!correctEmail.test(emailElement.value)) {
        emailElement.classList.add("error");
        alert("Email field must contain @, only letters, digits, -. symbols are permitted")
        return false;
    } else emailElement.classList.remove("error");
    return true;
}

submitButton.addEventListener("click", (event) => {
    checkForm();
    event.preventDefault();
});