const langSwitcher = document.getElementById("langSwitcher");

langSwitcher.addEventListener("change", (e) => {
  const lang = e.target.value;
  
  // тут можно подключить систему переводов или просто менять текст
  alert("Язык переключен на: " + lang.toUpperCase());

  // В будущем сюда вставим реальную локализацию
});


// rules_version = '2';

/*service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
*/