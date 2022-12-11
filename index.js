let textarea = document.getElementById("textarea");
let UpperCase = document.getElementById("upperCase");
let LowerCase = document.getElementById("lowerCase");
let DeleteText = document.getElementById("delete");
let CopyText = document.getElementById("copytext");
let text = document.getElementById("text");
let alertMesssage = document.getElementById("alertMesssage");
let previewText = document.getElementById("previewText");
let Translate = document.getElementById("translate");
let Meaning = document.getElementById("meaning");
let Main = document.getElementById("main");
let buttons = document.querySelectorAll("button");

const TextFormate = () => {
  UpperCase.addEventListener("click", (e) => {
    e.preventDefault();
    textarea.value = textarea.value.toUpperCase();
    if (textarea.value.length > 0) {
      alertMesssage.innerHTML = "Text Converted to UpperCase Successfully !";
    }
  });

  LowerCase.addEventListener("click", (e) => {
    e.preventDefault();
    textarea.value = textarea.value.toLowerCase();
    if (textarea.value.length > 0) {
      alertMesssage.innerHTML = "Text Converted to LowerCase Successfully !";
    }
  });

  DeleteText.addEventListener("click", (e) => {
    e.preventDefault();
    textarea.value = "";
    Main.innerHTML = "";
    Meaning.innerHTML = "";
    if (textarea.value.length >= 0) {
      alertMesssage.innerHTML = "Text Deleted Successfully !";
    }
  });

  CopyText.addEventListener("click", (e) => {
    e.preventDefault();
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textarea.value);
    if (textarea.value.length > 0) {
      alertMesssage.innerHTML = "Text Copied Successfully !";
    }
  });

  // Translate the value
  const fetchData = (value) => {
    Meaning.innerHTML = value;
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", "en");
    encodedParams.append("target_language", "hi");
    encodedParams.append("text", value);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "ad4bb0c9aamsh58ac0433c49348dp1f447ejsn5824a484b769",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      body: encodedParams,
    };

    fetch("https://text-translator2.p.rapidapi.com/translate", options)
      .then((response) => response.json())
      .then((response) => {
        Main.innerHTML = response.data.translatedText;
      });
  };
  Translate.addEventListener("click", (e) => {
    e.preventDefault();
    fetchData(textarea.value);
    if (textarea.value.length > 0) {
      alertMesssage.innerHTML = "Text Translated Successfully !";
    }
  });
};

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    if (textarea.value.length <= 0) {
      text.innerHTML = "Please enter a text ";
    } else if (textarea.value.length > 0) {
      text.innerHTML = "";
    }

    if (textarea.value.length > 0) {
      alertMesssage.classList.remove("demo");
    }
    setTimeout(() => {
      alertMesssage.classList.add("demo");
    }, 2500);
  });
});

TextFormate();
