const emailInput = document.getElementById("emailInput");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const signUpBtn = document.getElementById("signUp");
const userNameRegex = /(?=.*[A-Z])/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
signUpBtn.addEventListener("click", () => {
  let email = emailInput.value;
  let username = usernameInput.value;
  let password = passwordInput.value;

  if (email === "" || username === "" || password === "") {
    signUpBtn.nextElementSibling.textContent = "Values Cannot Be Empty";
  } else if (!username.match(userNameRegex)) {
    usernameInput.style.borderColor = "red";
    usernameInput.nextElementSibling.textContent = "Invalid Username";
  } else if (!email.match(emailRegex)) {
    emailInput.style.borderColor = "red";
    emailInput.nextElementSibling.textContent = "Invalid Email";
  } else if (password.length < 4) {
    passwordInput.style.borderColor = "red";
    passwordInput.nextElementSibling.textContent = "Invalid Password";
  } else {
    postData(email, password, username);
    window.location.href = "signIn.html";
  }
});

async function postData(email, password, username) {
  await fetch("https://655895c4e93ca47020a97c19.mockapi.io/users", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      username,
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => {
   
  });
}
