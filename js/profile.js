const PROFILE_KEY = "motoMarketProfile";
const SETTINGS_KEY = "motoMarketSettings";
const FAVORITES_KEY = "motoMarketFavorites";

const defaultProfile = {
  firstName: "Виталий",
  lastName: "Бакалейник",
  email: "vitaliy@email.com",
  primaryPhone: "",
  secondaryPhone: "",
  city: "Bat Yam",
  birthDate: "",
  aboutMe: ""
};

const defaultSettings = {
  showPhone: true,
  allowMessages: true,
  emailNotifications: true,
  businessAccount: false
};

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function openPanel(panelName) {
  document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.tabPanel === panelName);
  });

  document.querySelectorAll("[data-tab-target]").forEach((button) => {
    button.classList.toggle("active", button.dataset.tabTarget === panelName);
  });
}

function renderProfile(profile) {
  const displayName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Moto Market user";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  document.getElementById("profileDisplayName").textContent = displayName;
  document.getElementById("profileDisplayEmail").textContent = profile.email || "email@example.com";
  document.getElementById("profileAvatar").textContent = initials || "MM";
}

function fillProfileForm(profile) {
  Object.entries(profile).forEach(([key, value]) => {
    const field = document.getElementById(key);
    if (field) field.value = value;
  });
}

function fillSettings(settings) {
  Object.entries(settings).forEach(([key, value]) => {
    const field = document.getElementById(key);
    if (field) field.checked = Boolean(value);
  });
}

function renderFavorites() {
  const favorites = readJson(FAVORITES_KEY, []);
  const list = document.getElementById("favoritesList");
  const count = favorites.length;

  document.getElementById("favoritesCount").textContent = count;
  document.getElementById("favoritesStat").textContent = count;

  if (!list) return;

  if (!favorites.length) {
    list.innerHTML = `
      <div class="empty-state">
        <h3 data-i18n="favorites_empty_title">Пока нет избранных объявлений</h3>
        <p data-i18n="favorites_empty_body">Нажмите сердечко на карточке мотоцикла, и объявление появится здесь.</p>
        <a class="btn btn-outline compact" href="index.html#trending" data-i18n="go_to_offers">Перейти к предложениям</a>
      </div>
    `;
    if (window.changeLanguage) window.changeLanguage(localStorage.getItem("language") || "ru");
    return;
  }

  list.innerHTML = favorites.map((item) => `
    <article class="favorite-row" data-favorite-id="${item.id}">
      <img src="${item.image}" alt="${item.title}">
      <div>
        <h3>${item.title}</h3>
        <p>${item.year}</p>
        <strong>${item.price}</strong>
      </div>
      <button class="btn btn-outline compact remove-favorite" type="button" data-id="${item.id}" data-i18n="remove_favorite">Удалить</button>
    </article>
  `).join("");

  document.querySelectorAll(".remove-favorite").forEach((button) => {
    button.addEventListener("click", () => {
      const next = readJson(FAVORITES_KEY, []).filter((item) => item.id !== button.dataset.id);
      writeJson(FAVORITES_KEY, next);
      renderFavorites();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const profile = { ...defaultProfile, ...readJson(PROFILE_KEY, {}) };
  const settings = { ...defaultSettings, ...readJson(SETTINGS_KEY, {}) };

  renderProfile(profile);
  fillProfileForm(profile);
  fillSettings(settings);
  renderFavorites();

  document.querySelectorAll("[data-tab-target]").forEach((button) => {
    button.addEventListener("click", () => openPanel(button.dataset.tabTarget));
  });

  document.getElementById("profileForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const nextProfile = {
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      email: document.getElementById("profileEmail").value.trim(),
      primaryPhone: document.getElementById("primaryPhone").value.trim(),
      secondaryPhone: document.getElementById("secondaryPhone").value.trim(),
      city: document.getElementById("city").value.trim(),
      birthDate: document.getElementById("birthDate").value,
      aboutMe: document.getElementById("aboutMe").value.trim()
    };

    writeJson(PROFILE_KEY, nextProfile);
    renderProfile(nextProfile);
    document.getElementById("profileFormStatus").textContent = "Saved";
  });

  document.getElementById("settingsForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const nextSettings = {
      showPhone: document.getElementById("showPhone").checked,
      allowMessages: document.getElementById("allowMessages").checked,
      emailNotifications: document.getElementById("emailNotifications").checked,
      businessAccount: document.getElementById("businessAccount").checked
    };

    writeJson(SETTINGS_KEY, nextSettings);
    document.getElementById("settingsStatus").textContent = "Saved";
  });
});
