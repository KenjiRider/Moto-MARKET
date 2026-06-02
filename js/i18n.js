const translations = {

    ru: {
        home: "Главная",
        listings: "Объявления",
        about: "О нас",
        profile: "Профиль",
        login: "Войти",
        register: "Регистрация",
        email: "Email",
        password: "Пароль",
        enterEmail: "Введите email",
        enterPassword: "Введите пароль"
    },

    en: {
        home: "Home",
        listings: "Listings",
        about: "About",
        profile: "Profile",
        login: "Login",
        register: "Register",
        email: "Email",
        password: "Password",
        enterEmail: "Enter email",
        enterPassword: "Enter password"
    },

    ua: {
        home: "Головна",
        listings: "Оголошення",
        about: "Про нас",
        profile: "Профіль",
        login: "Увійти",
        register: "Реєстрація",
        email: "Email",
        password: "Пароль",
        enterEmail: "Введіть email",
        enterPassword: "Введіть пароль"
    },

    he: {
        home: "ראשי",
        listings: "מודעות",
        about: "עלינו",
        profile: "פרופיל",
        login: "התחברות",
        register: "הרשמה",
        email: "אימייל",
        password: "סיסמה",
        enterEmail: "הכנס אימייל",
        enterPassword: "הכנס סיסמה"
    }
};

function changeLanguage(lang) {

    localStorage.setItem("language", lang);

    document.querySelectorAll("[data-lang]").forEach(el => {

        const key = el.getAttribute("data-lang");

        if (translations[lang][key]) {
            el.innerText = translations[lang][key];
        }

    });

    document.querySelectorAll("[data-placeholder]").forEach(el => {

        const key = el.getAttribute("data-placeholder");

        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }

    });

    if (lang === "he") {
        document.body.dir = "rtl";
    } else {
        document.body.dir = "ltr";
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const savedLang = localStorage.getItem("language") || "ru";

    const selector = document.getElementById("languageSwitcher");

    if (selector) {

        selector.value = savedLang;

        selector.addEventListener("change", (e) => {
            changeLanguage(e.target.value);
        });
    }

    changeLanguage(savedLang);
});