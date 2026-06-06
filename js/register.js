document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.target);
      if (!input) return;

      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      button.textContent = isPassword ? "Hide" : "Show";
    });
  });

  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if (username.length < 3) {
      errorMsg.textContent = "Name must contain at least 3 characters";
      return;
    }

    if (!email.includes("@")) {
      errorMsg.textContent = "Email must contain @";
      return;
    }

    if (!/^[0-9+\-\s]{7,15}$/.test(phone)) {
      errorMsg.textContent = "Enter a valid phone number";
      return;
    }

    if (password.length < 6 || password.length > 32) {
      errorMsg.textContent = "Password must be 6 to 32 characters";
      return;
    }

    if (password !== confirmPassword) {
      errorMsg.textContent = "Passwords do not match";
      return;
    }

    const [firstName, ...lastNameParts] = username.split(" ");
    localStorage.setItem("motoMarketAuth", JSON.stringify({
      isLoggedIn: true,
      email,
      loggedInAt: new Date().toISOString()
    }));

    localStorage.setItem("motoMarketProfile", JSON.stringify({
      firstName: firstName || username,
      lastName: lastNameParts.join(" "),
      email,
      primaryPhone: phone,
      secondaryPhone: "",
      city: "",
      birthDate: "",
      aboutMe: ""
    }));

    errorMsg.textContent = "";
    window.location.href = "profile.html";
  });
});
