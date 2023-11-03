const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  }, {
    threshold: 0.5, 
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));


// Connect HTML to DOM
const form = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-button");
const successMessage = document.getElementById("form-submitted-msg");

const formElements = [...form.elements];

// Create a function to check if all form elements are valid
const allInputsValid = () => {
  return formElements.every((element) => {
    return element.checkValidity();
  });
};

// Define a function to handle changes to any form element
const handleChange = () => {
  formElements.forEach((element) => {
    if (!element.checkValidity()) {
      element.style.borderColor = "red";
    } else {
      element.style.borderColor = "#322653";
    }
  });

  if (allInputsValid()) {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", "");
  }
};

// Define a function to handle form submission
const handleSubmit = (e) => {
  e.preventDefault();

  if (allInputsValid()) {
    successMessage.style.display = "block";
    form.reset();
    submitButton.setAttribute("disabled", "");

    setTimeout(() => {
      successMessage.style.display = "none";
    }, 3000);
  }
};

// Add event listener to each form element
formElements.forEach((element) => {
  element.addEventListener("input", handleChange);
});

// Add submit listener to the form
form.addEventListener("submit", (e) => handleSubmit(e));
