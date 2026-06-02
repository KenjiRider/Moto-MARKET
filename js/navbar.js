document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("navbar-container");
  if (!container) return;

  const response = await fetch("components/navbar.html");
  const html = await response.text();
  container.innerHTML = html;

  if (typeof setLanguage === 'function') {
    setLanguage(localStorage.getItem('lang') || 'ru');
  }
});
