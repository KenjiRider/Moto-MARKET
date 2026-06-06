const LISTING_FAVORITES_KEY = "motoMarketFavorites";

function readFavorites() {
  try {
    return JSON.parse(localStorage.getItem(LISTING_FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function writeFavorites(items) {
  localStorage.setItem(LISTING_FAVORITES_KEY, JSON.stringify(items));
}

function syncFavoriteButtons() {
  const favorites = readFavorites();
  const ids = new Set(favorites.map((item) => item.id));

  document.querySelectorAll(".favorite-btn").forEach((button) => {
    const isActive = ids.has(button.dataset.id);
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.textContent = isActive ? "♥" : "♡";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const favorites = readFavorites();
      const exists = favorites.some((item) => item.id === button.dataset.id);
      const nextFavorites = exists
        ? favorites.filter((item) => item.id !== button.dataset.id)
        : [...favorites, {
            id: button.dataset.id,
            title: button.dataset.title,
            year: button.dataset.year,
            price: button.dataset.price,
            image: button.dataset.image
          }];

      writeFavorites(nextFavorites);
      syncFavoriteButtons();
    });
  });

  syncFavoriteButtons();
});
