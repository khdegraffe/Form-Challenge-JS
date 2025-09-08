const form = document.querySelector("#userForm");
const btn = document.querySelector("#submitBtn");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const emailInput = document.querySelector("#emailInput");
const email = document.querySelector("#email");
const subscribe = document.querySelector("#subscribe");
const commentArea = document.querySelector("#commentArea");
const messageDiv = document.querySelector("#message");

function validateInputs() {
  if (firstName.value.trim() !== "" && lastName.value.trim() !== "") {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

firstName.addEventListener("input", validateInputs);
lastName.addEventListener("input", validateInputs);

subscribe.addEventListener("change", () => {
  emailInput.style.display = subscribe.checked ? "block" : "none";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("submit handler triggered");

  //request Object
  const data = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    isSubscribed: subscribe.checked,
    comment: commentArea.value.trim(),
  };

  if (subscribe.checked) {
    data.email = email.value.trim();
  }

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Network response was not ok");

    messageDiv.textContent = `Thanks for you submission, ${data.firstName}!`;
    messageDiv.className = "success show";

    form.reset();
    emailInput.style.display = "none";
    btn.disabled = true;

    setTimeout(() => {
      messageDiv.textContent = "";
      messageDiv.className = "";
    }, 2000);
  } catch (err) {
    messageDiv.textContent = "Whoops, something went wrong.";
    messageDiv.className = "error show";
  }
});
