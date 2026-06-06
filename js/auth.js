document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("emailInput").value.trim();
    const existingProfile = JSON.parse(localStorage.getItem("motoMarketProfile") || "{}");

    localStorage.setItem("motoMarketAuth", JSON.stringify({
      isLoggedIn: true,
      email,
      loggedInAt: new Date().toISOString()
    }));

    localStorage.setItem("motoMarketProfile", JSON.stringify({
      firstName: existingProfile.firstName || "Виталий",
      lastName: existingProfile.lastName || "Бакалейник",
      email,
      primaryPhone: existingProfile.primaryPhone || "",
      secondaryPhone: existingProfile.secondaryPhone || "",
      city: existingProfile.city || "Bat Yam",
      birthDate: existingProfile.birthDate || "",
      aboutMe: existingProfile.aboutMe || ""
    }));

    window.location.href = "profile.html";
  });
});
