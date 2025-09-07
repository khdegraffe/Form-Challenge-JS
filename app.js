const btn = document.querySelector("#submitBtn");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const emailInput = document.querySelector("#emailInput");
const newsletterCheck = document.querySelector("#newsletterCheck");
const commentSection = document.querySelector("#commentSection");

//Helper function for after Submit click
const resetInputs = () => {
  firstName.toString = "";
  lastName.toString = "";
  commentSection.toString = "";
  newsletterCheck.checked = false;
  emailInput.toString = "";
};

//Button Disabled by defauled
btn.disabled = true;

//Valdiate inputs function to activate our btn if there is an input in both text boxes
function validateInputs() {
  if (firstName.value.trim() !== "" && lastName.value.trim() !== "") {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

emailInput.hidden = true;
function displayEmail() {
  if (newsletterCheck.checked === true) {
    emailInput.hidden = false;
  } else {
    emailInput.hidden = true;
  }
}

btn.addEventListener("click", () => {
  e.preventDefault();
  resetInputs();
});

firstName.addEventListener("input", validateInputs);
lastName.addEventListener("input", validateInputs);
newsletterCheck.addEventListener("click", displayEmail);

const myRequest = new Request("https://jsonplaceholder.typicode.com/", {
  method: "POST",
  firstName: `$firstName.value`,
  lastName: `$lastName.value`,
  isSubscribed: newsletterCheck.checked,
  email: (newsletterCheck = on ? `${emailInput}` : ""),
});

async function getData() {
  const url = "https://jsonplaceholder.typicode.com/";
  try {
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}
