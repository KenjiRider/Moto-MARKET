document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("navbar-container");
  if (!container) return;

  try {
    const response = await fetch("components/navbar.html");
    if (!response.ok) throw new Error("Navbar component was not found");

    container.innerHTML = await response.text();
    document.dispatchEvent(new CustomEvent("navbar:loaded"));
  } catch (error) {
    console.error("Failed to load navbar:", error);
  }
});
