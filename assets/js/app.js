import { inputValidator } from "./validators.js";

const inputsArray = document.querySelectorAll('input');

inputsArray.forEach((input) => {
    input.addEventListener("blur", (input) => {
        inputValidator(input.target);
    })
})