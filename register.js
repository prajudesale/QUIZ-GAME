document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Check if the username already exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.username === username);
  
    if (userExists) {
      document.getElementById("error").textContent = "Username already exists. Please choose another.";
    } else {
      // Save the new user to local storage
      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
  
      // Redirect to the login page
      window.location.href = "login.html";
    }
  });