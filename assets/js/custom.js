
/* 11 LAB - KONTAKTU FORMOS APDOROJIMAS */

document.addEventListener("DOMContentLoaded", function () {

  const forma = document.getElementById("contactForm");
  const rezultatas = document.getElementById("formResult");

  if (!forma || !rezultatas) return;

  const mygtukas = forma.querySelector('button[type="submit"]');

  const privalomiLaukai = [
    "vardas",
    "pavarde",
    "pastas",
    "telefonas",
    "adresas"
  ];

  // 6 UZDUOTIS - MYGTUKO AKTYVUMAS

// 11 LAB - PAPILDOMA - VALIDACIJA

function tikrintiForma() {
  let viskasGerai = true;

  const laukai = [
    "vardas",
    "pavarde",
    "pastas",
    "adresas"
  ];

  laukai.forEach(function (id) {
    const laukas = document.getElementById(id);
    const reiksme = laukas.value.trim();

    let klaida = "";

    if (reiksme === "") {
      klaida = "Šis laukas yra privalomas";
    }

    if (id === "pastas" && reiksme !== "") {
        const elPastas = new RegExp("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$");


      if (!elPastas.test(reiksme)) {
        klaida = "Neteisingas el. pašto formatas";
      }
    }

    laukas.classList.toggle("input-error", klaida !== "");

    let pranesimas = laukas.parentElement.querySelector(".error-message");

    if (!pranesimas) {
      pranesimas = document.createElement("small");
      pranesimas.className = "error-message";
      laukas.parentElement.appendChild(pranesimas);
    }

    pranesimas.textContent = klaida;

    if (klaida !== "") {
      viskasGerai = false;
    }
  });

  // Vertinimu patikrinimas
  ["klausimas1", "klausimas2", "klausimas3"].forEach(function (id) {
    const laukas = document.getElementById(id);
    const reiksme = Number(laukas.value);

    if (reiksme < 1 || reiksme > 10 || !Number.isFinite(reiksme)) {
      viskasGerai = false;
    }
  });

  
// Tikriname telefono numeri
const telefonas = document.getElementById("telefonas");
const telefonoFormatas = new RegExp("^\\+370 6[0-9]{2} [0-9]{5}$");


if (!telefonoFormatas.test(telefonas.value)) {
  viskasGerai = false;
}
mygtukas.disabled = !viskasGerai;
}

  // Tikriname forma kiekviena karta ivedus duomenis
  ["vardas", "pavarde", "pastas", "adresas"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", tikrintiForma);
  });

  // Tikriname pasikeitus vertinimams
  ["klausimas1", "klausimas2", "klausimas3"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", tikrintiForma);
  });

  
// 11 LAB - TELEFONO NUMERIO FORMATAVIMAS

const telefonoLaukas = document.getElementById("telefonas");

telefonoLaukas.addEventListener("input", function () {
  let skaiciai = this.value.replace(/\D/g, "");

  // Pasaliname Lietuvos koda, jei ivestas
  if (skaiciai.startsWith("370")) {
    skaiciai = skaiciai.slice(3);
  }

  // Leidziame daugiausia 8 vietinius skaitmenis
  skaiciai = skaiciai.slice(0, 8);

  let numeris = "+370";

  if (skaiciai.length > 0) {
    numeris += " " + skaiciai.slice(0, 3);
  }

  if (skaiciai.length > 3) {
    numeris += " " + skaiciai.slice(3);
  }

  this.value = numeris;

  tikrintiForma();
});
tikrintiForma();

// 11 LAB - FORMOS ISVALYMAS

const isvalytiMygtukas = document.getElementById("clearForm");

isvalytiMygtukas.addEventListener("click", function () {

  // Isvalome visus formos laukus
  forma.reset();

  // Isvalome telefono numeri
  document.getElementById("telefonas").value = "";

  // Isvalome rezultatus
  rezultatas.replaceChildren();

  // Pasaliname validacijos klaidas
  forma.querySelectorAll(".input-error").forEach(function (laukas) {
    laukas.classList.remove("input-error");
  });

  forma.querySelectorAll(".error-message").forEach(function (pranesimas) {
    pranesimas.textContent = "";
  });

  // Vel isjungiame Siusti mygtuka
  mygtukas.disabled = true;

});


  // 4 IR 5 UZDUOTYS - DUOMENU APDOROJIMAS
  forma.addEventListener("submit", function (event) {
    event.preventDefault();

    tikrintiForma();
    if (mygtukas.disabled) return;

    const duomenys = {
      vardas: document.getElementById("vardas").value.trim(),
      pavarde: document.getElementById("pavarde").value.trim(),
      pastas: document.getElementById("pastas").value.trim(),
      telefonas: document.getElementById("telefonas").value.trim(),
      adresas: document.getElementById("adresas").value.trim(),
      klausimas1: Number(document.getElementById("klausimas1").value),
      klausimas2: Number(document.getElementById("klausimas2").value),
      klausimas3: Number(document.getElementById("klausimas3").value)
    };

    // Apskaiciuojame 3 vertinimu vidurki
    const vidurkis = (
      (duomenys.klausimas1 +
       duomenys.klausimas2 +
       duomenys.klausimas3) / 3
    ).toFixed(2);

    duomenys.vidurkis = vidurkis;

    // Isvedame objekta i konsole
    console.log("Formos duomenys:", duomenys);

    // Parodome visus duomenis puslapyje
    rezultatas.replaceChildren();

    const antraste = document.createElement("h3");
    antraste.textContent = "Pateikti duomenys";
    rezultatas.appendChild(antraste);

    const laukai = {
      "Vardas": duomenys.vardas,
      "Pavardė": duomenys.pavarde,
      "El. paštas": duomenys.pastas,
      "Telefonas": duomenys.telefonas,
      "Adresas": duomenys.adresas,
      "1 klausimas": duomenys.klausimas1,
      "2 klausimas": duomenys.klausimas2,
      "3 klausimas": duomenys.klausimas3
    };

    Object.entries(laukai).forEach(function ([pavadinimas, verte]) {
      const eilute = document.createElement("p");
      eilute.textContent = pavadinimas + ": " + verte;
      rezultatas.appendChild(eilute);
    });

    // 5 UZDUOTIS - VIDURKIO REZULTATAS
    const vidurkioEilute = document.createElement("p");
    vidurkioEilute.className = "average-result";

    vidurkioEilute.textContent =
      duomenys.vardas + " " +
      duomenys.pavarde + ": " +
      vidurkis;

    rezultatas.appendChild(vidurkioEilute);
  });

});
