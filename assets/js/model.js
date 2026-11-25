
// 1 UZDUOTIS - IGUDZIU MASYVAS

const igudziai = [
  { pavadinimas: "Elektros tinklų projektavimas", busena: "Planuojama", xp: 50 },
  { pavadinimas: "Atsinaujinanti energetika", busena: "Planuojama", xp: 50 },
  { pavadinimas: "Elektros mašinos", busena: "Mokomasi", xp: 50 },
  { pavadinimas: "Transformatoriai", busena: "Mokomasi", xp: 35 },
  { pavadinimas: "Elektros grandinių analizė", busena: "Mokomasi", xp: 30 },
  { pavadinimas: "Elektrosauga", busena: "Atlikta", xp: 30 },
  { pavadinimas: "Elektrotechnika", busena: "Atlikta", xp: 35 },
  { pavadinimas: "Elektriniai matavimai", busena: "Atlikta", xp: 20 }
];


// 1 UZDUOTIS - KORTELIU GENERAVIMAS

function atvaizduotiKorteles() {

  igudziai.forEach(function(igudis) {

    const kortele = document.createElement("div");
    kortele.className = "skill-card";

    kortele.innerHTML = `
      <h3>${igudis.pavadinimas}</h3>
      <p>Būsena:</p>

      <select class="skill-status">
        <option value="Planuojama">Planuojama</option>
        <option value="Mokomasi">Mokomasi</option>
        <option value="Atlikta">Atlikta</option>
      </select>

      <span>${igudis.xp} XP</span>
    `;


    // 2 UZDUOTIS - BUSENOS KEITIMAS

    const pasirinkimas = kortele.querySelector("select");
    pasirinkimas.value = igudis.busena;

    pasirinkimas.addEventListener("change", function() {

      igudis.busena = pasirinkimas.value;

      const naujaKategorija = document.getElementById(
        igudis.busena.toLowerCase()
      );

      naujaKategorija.appendChild(kortele);

      atnaujintiXP();

    });

    const kategorija = document.getElementById(
      igudis.busena.toLowerCase()
    );

    kategorija.appendChild(kortele);

  });

}


// 3 UZDUOTIS - XP, LYGIS IR RANGAS

function atnaujintiXP() {

  let bendrasXP = 0;

  igudziai.forEach(function(igudis) {

    if (igudis.busena === "Atlikta") {
      bendrasXP += igudis.xp;
    }

  });

  let lygis;
  let rangas;

  if (bendrasXP >= 300) {
    lygis = 4;
    rangas = "Profesionalas";
  } else if (bendrasXP >= 150) {
    lygis = 3;
    rangas = "Specialistas";
  } else if (bendrasXP >= 50) {
    lygis = 2;
    rangas = "Praktikantas";
  } else {
    lygis = 1;
    rangas = "Pradedantysis";
  }

  document.getElementById("bendras-xp").textContent =
    bendrasXP + " XP";

  document.getElementById("lygis").textContent =
    lygis;

  document.getElementById("rangas").textContent =
    rangas;

  atnaujintiProgresoJuosta(bendrasXP, lygis);
  atnaujintiStatistika();

}


// 4 UZDUOTIS - PROGRESO JUOSTA

function atnaujintiProgresoJuosta(bendrasXP, lygis) {

  let pradzia;
  let pabaiga;

  if (lygis === 1) {
    pradzia = 0;
    pabaiga = 50;
  } else if (lygis === 2) {
    pradzia = 50;
    pabaiga = 150;
  } else if (lygis === 3) {
    pradzia = 150;
    pabaiga = 300;
  } else {
    pradzia = 300;
    pabaiga = 300;
  }

  let procentai;

  if (lygis === 4) {
    procentai = 100;
  } else {
    procentai =
      ((bendrasXP - pradzia) / (pabaiga - pradzia)) * 100;
  }

  document.getElementById("progreso-uzpildas").style.width =
    procentai + "%";

  document.getElementById("progreso-tekstas").textContent =
    bendrasXP + " / " + pabaiga + " XP";

  if (lygis === 4) {

    document.getElementById("progreso-antraste").textContent =
      "Pasiektas maksimalus lygis";

  } else {

    document.getElementById("progreso-antraste").textContent =
      "Progresas iki " + (lygis + 1) + " lygio";

  }

  const juosta = document.getElementById("progreso-juosta");

  juosta.setAttribute("aria-valuenow", Math.min(bendrasXP, pabaiga));
  juosta.setAttribute("aria-valuemin", lygis === 4 ? 0 : pradzia);
  juosta.setAttribute("aria-valuemax", pabaiga);

}


// 5 UZDUOTIS - IGUDZIU STATISTIKA

function atnaujintiStatistika() {

  const bendrasSkaicius = igudziai.length;

  let atlikti = 0;

  igudziai.forEach(function(igudis) {

    if (igudis.busena === "Atlikta") {
      atlikti++;
    }

  });

  const procentai = (atlikti / bendrasSkaicius) * 100;

  document.getElementById("bendras-igudziu-skaicius").textContent =
    bendrasSkaicius;

  document.getElementById("atlikti-igudziai").textContent =
    atlikti;

  document.getElementById("atliktu-procentas").textContent =
    procentai.toLocaleString("lt-LT") + " %";

}


// 6 UZDUOTIS - FUNKCIJU ISKVIETIMAS

atvaizduotiKorteles();
atnaujintiXP();
