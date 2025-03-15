document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Get registered users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if the username and password match
    const user = users.find((user) => user.username === username && user.password === password);
  
    if (user) {
      // Redirect to the quiz page
      window.location.href = "quiz.html";
    } else {
      // Show error message
      document.getElementById("error").textContent = "Invalid username or password.";
    }
  });