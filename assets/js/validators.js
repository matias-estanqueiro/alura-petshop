// const inputBirthday = document.querySelector('#birth');

// inputBirthday.addEventListener('blur', (event) => {
//     birthdayValidator(event.target);
// });

const validators = {
    birthday: (input) => birthdayValidator(input),
};

const errorType = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
    "tooShort"
];

const errorMessages = {
    name: {
        valueMissing: "Name field cannot be empty."
    },
    email: {
        valueMissing: "Email field cannot be empty.",
        typeMismatch: "The email entered does not have a valid format."
    },
    password: {
        valueMissing: "Password field cannot be empty.",
        patternMismatch: "At least 6 characters, maximum 12. Must contain one lowercase letter, one uppercase letter, one number, and no one special character."
    },
    birthday: {
        valueMissing: "Birthday field cannot be empty.",
        customError: "You must be at least 18 years old"
    },
    phonenumber: {
        valueMissing: "Phone Number field cannot be empty.",
        patternMismatch: "Only numbers. The format required is 10 digits (xxxxxxxxxx)",
        tooShort: "The format required is 10 digits (xxxxxxxxxx)"
    },
    address: {
        valueMissing: "Address field field cannot be empty.",
        patternMismatch: "Only letters and numbers. Minimum of 10 characters; maximum of 40 characters.",
        tooShort: "Minimum of 10 characters"
    },
    city: {
        valueMissing: "City field cannot be empty.",
        patternMismatch: "Only letters and numbers. Minimum of 3 characters; maximum of 20 characters.",
        tooShort: "Minimum of 3 characters"
    },
    state: {
        valueMissing: "State field cannot be empty.",
        patternMismatch: "Only letters and numbers. Minimum of 3 characters; maximum of 20 characters.",
        tooShort: "Minimum of 3 characters"
    }

};

export function inputValidator(input){
    const inputType = input.dataset.type;
    if(validators[inputType]){
        validators[inputType](input);
    };

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector('.input-message-error').innerHTML = showErrorMessage(inputType, input);
    };
};

function birthdayValidator(birthInput){
    const clientBirthday = new Date(birthInput.value);
    let message = '';
    if (!isAdult(clientBirthday)){
        message = 'You must be at least 18 years old';
    };
    
    birthInput.setCustomValidity(message);
};

function isAdult(clientBirth){
    const actualDate = new Date();
    const dateDifference = new Date(clientBirth.getUTCFullYear() + 18, clientBirth.getUTCMonth(), clientBirth.getUTCDate());
    return dateDifference <= actualDate;
};

function showErrorMessage(inputType, input) {
    let message = '';
    errorType.forEach(error => {
        if(input.validity[error]){
            console.log(inputType, error);
            console.log(input.validity[error]);
            console.log(errorMessages[inputType][error]);
            message = errorMessages[inputType][error];
        };
    });
    return message;
};
