// Перемикач видимості паролю
function togglePassword(id, el) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
    el.textContent = "🙈";
  } else {
    input.type = "password";
    el.textContent = "👁️";
  }
}

// Перевірка введених даних
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (username.length < 3) return errorMsg.textContent = "Ім'я має містити мінімум 3 символи";
  if (!email.includes("@")) return errorMsg.textContent = "Емейл має містити @";
  if (!/^[0-9]{7,8}$/.test(phone)) return errorMsg.textContent = "Номер телефону має містити 7 або 8 цифр";
  if (password.length === 0 || password.length > 8) return errorMsg.textContent = "Пароль має бути максимум 8 символів";
  if (password !== confirmPassword) return errorMsg.textContent = "Паролі не збігаються";

  errorMsg.textContent = "";
  alert("Реєстрація успішна ✅");
});

// Мовні переклади
const translations = {
  ua: {
    title: "Реєстрація | Moto Market",
    home: "Головна",
    register: "Реєстрація",
    registerBtn: "Зареєструватися",
    already: "Вже маєш акаунт?",
    login: "Увійти"
  },
  en: {
    title: "Register | Moto Market",
    home: "Home",
    register: "Register",
    registerBtn: "Sign Up",
    already: "Already have an account?",
    login: "Log In"
  },
  ru: {
    title: "Регистрация | Moto Market",
    home: "Главная",
    register: "Регистрация",
    registerBtn: "Зарегистрироваться",
    already: "Уже есть аккаунт?",
    login: "Войти"
  },
  he: {
    title: "הרשמה | שוק האופנועים",
    home: "בית",
    register: "הרשמה",
    registerBtn: "הרשם",
    already: "כבר יש לך חשבון?",
    login: "להתחבר"
  }
};

// Зміна мови
document.getElementById("languageSelect").addEventListener("change", function() {
  const lang = this.value;
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach(el => {
    const key = el.getAttribute("data-lang");
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
  document.title = translations[lang].title;
});
