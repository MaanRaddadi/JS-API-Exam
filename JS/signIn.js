const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const signInBtn = document.getElementById("signIn");

signInBtn.addEventListener("click", () => {
  let username = usernameInput.value;
  let password = passwordInput.value;
  if (username === "" || password === "") {
    signInBtn.nextElementSibling.textContent = "Values Cannot be empty";
  } else {
    checkUser(username, password);
  }
});

async function checkUser(username, password) {
  await fetch("https://655895c4e93ca47020a97c19.mockapi.io/users")
    .then((respons) => respons.json())
    .then((data) => {
      console.log(data);
      let user = data.find(
        (d) => d.username == username && d.password == password
      );
      console.log(user);
      if (user) {
        const user = {
          username: username,
          password: password,
        };
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "index.html";
      } else {
        signInBtn.nextElementSibling.textContent = "User not found";
      }
    });
}
