const userInput = document.getElementById("userInput");
const responseStatus = document.getElementById("responseStatus");

// get tw stats elements
const twXP = document.getElementById("twXP");
const twTimesPlayed = document.getElementById("twTimesPlayed");
const twWins = document.getElementById("twWins");
const twFirstPlayed = document.getElementById("twFirstPlayed");
const twFinalKills = document.getElementById("twFinalKills");
const twKills = document.getElementById("twKills");
const twTreasuresDestroyed = document.getElementById("twTreasuresDestroyed");
const twDeaths = document.getElementById("twDeaths");
const twKDR = document.getElementById("twKDR");
const twFKDR = document.getElementById("twFKDR");
const twPrestige = document.getElementById("twPrestige");

// get deathrun stats elements
const drXP = document.getElementById("drXP");
const drTimesPlayed = document.getElementById("drTimesPlayed");
const drWins = document.getElementById("drWins");
const drFirstPlayed = document.getElementById("drFirstPlayed");
const drDeaths = document.getElementById("drDeaths");
const drKills = document.getElementById("drKills");
const drCheckpoints = document.getElementById("drCheckpoints");
const drTrapsActivated = document.getElementById("drTrapsActivated");
const drKDR = document.getElementById("drKDR");

// get hide n seek elements
const hideXP = document.getElementById("hideXP");
const hideTimesPlayed = document.getElementById("hideTimesPlayed");
const hideWins = document.getElementById("hideWins");
const hideFirstPlayed = document.getElementById("hideFirstPlayed");
const hideDeaths = document.getElementById("hideDeaths");
const hideKDR = document.getElementById("hideKDR");
const hiderKills = document.getElementById("hiderKills");
const seekerKills = document.getElementById("seekerKills");

// get sg elements
const sgXP = document.getElementById("sgXP");
const sgTimesPlayed = document.getElementById("sgTimesPlayed");
const sgWins = document.getElementById("sgWins");
const sgFirstPlayed = document.getElementById("sgFirstPlayed");
const sgCrates = document.getElementById("sgCrates");
const sgDeathmatches = document.getElementById("sgDeathmatches");
const sgLootCows = document.getElementById("sgLootCows");
const sgKills = document.getElementById("sgKills");

// get murder mystery stats elements
const mmXP = document.getElementById("mmXP");
const mmTimesPlayed = document.getElementById("mmTimesPlayed");
const mmWins = document.getElementById("mmWins");
const mmDeaths = document.getElementById("mmDeaths");
const mmFirstPlayed = document.getElementById("mmFirstPlayed");
const mmCoinsCollected = document.getElementById("mmCoinsCollected");
const mmMurders = document.getElementById("mmMurders");
const mmMurdererEliminations = document.getElementById("mmMurdererEliminations");
const mmKDR = document.getElementById("mmKDR");

function handleErrors(response) {
  if (!response.ok) {
    responseStatus.style.display = "block";
    responseStatus.style.color = "crimson";
    responseStatus.textContent = `Epic API Fail! (Status code: ${response.status})`;
  } else if (response.ok) {
    responseStatus.style.display = "block";
    responseStatus.style.color = "#59bd59";
    responseStatus.textContent = `API request succeeded! (Status code: ${response.status})`;
  }
  return response;
}

let coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    content.style.display = "grid";
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.display = "inline";
    }
  });
}

function getStats(gamemode, statsFunction) {
  const username = userInput.value; // this will be used in the api request

  fetch(`https://api.playhive.com/v0/game/all/${gamemode}/${username}`)
    .then(handleErrors)
    .then((response) => {
      response.json().then(function (json) {
        statsFunction(json);
      });
    });
}

function onBtnClick() {
  responseStatus.style.display = "block";
  responseStatus.style.color = "Khaki";
  responseStatus.textContent = `Sending API request...`;

  getStats("wars", fillStatsWars);
  getStats("dr", fillStatsDeathRun);
  getStats("hide", fillStatsHide);
  getStats("sg", fillStatsSG);
  getStats("murder", fillStatsMM);
}

function unixToNormal(json) {
  let firstPlayedNormal = new Date(json.first_played * 1000).toLocaleDateString(
    "en-US"
  );

  return firstPlayedNormal;
}

function kdrCalc(jsonKills, jsonDeaths) {
  let KDR = jsonKills / jsonDeaths;
  KDR = KDR.toFixed(1);

  return KDR;
}

function kdrCalcHide(jsonHiderKills, jsonSeekerKills, jsonDeaths) {
  let totalKills = jsonHiderKills + jsonSeekerKills;
  let KDR = totalKills / jsonDeaths;
  KDR = KDR.toFixed(1);

  return KDR;
}

function fillStatsWars(json) {
  twXP.textContent = `XP: ${json.xp}`;
  twTimesPlayed.textContent = `Times played: ${json.played}`;
  twWins.textContent = `Wins: ${json.victories}`;
  twFirstPlayed.textContent = `First played: ${unixToNormal(json)}`;
  twFinalKills.textContent = `Final kills: ${json.final_kills}`;
  twKills.textContent = `Kills: ${json.kills}`;
  twTreasuresDestroyed.textContent = `Treasures destroyed: ${json.treasure_destroyed}`;
  twDeaths.textContent = `Deaths: ${json.deaths}`;
  twPrestige.textContent = `Prestige: ${json.prestige}`;
  twKDR.textContent = `K/D: ${kdrCalc(json.kills, json.deaths)}`;
  twFKDR.textContent = `FK/D: ${kdrCalc(json.final_kills, json.deaths)}`;
}

function fillStatsDeathRun(json) {
  drXP.textContent = `XP: ${json.xp}`;
  drTimesPlayed.textContent = `Times played: ${json.played}`;
  drWins.textContent = `Wins: ${json.victories}`;
  drFirstPlayed.textContent = `First played: ${unixToNormal(json)}`;
  drDeaths.textContent = `Deaths: ${json.deaths}`;
  drCheckpoints.textContent = `Checkpoints reached: ${json.checkpoints}`;
  drTrapsActivated.textContent = `Traps activated: ${json.activated}`;
  drKills.textContent = `Kills: ${json.kills}`;
  drKDR.textContent = `K/D: ${kdrCalc(json.kills, json.deaths)}`;
}

function fillStatsHide(json) {
  hideXP.textContent = `XP: ${json.xp}`;
  hideTimesPlayed.textContent = `Times played: ${json.played}`;
  hideWins.textContent = `Wins: ${json.victories}`;
  hideFirstPlayed.textContent = `First played: ${unixToNormal(json)}`;
  hideDeaths.textContent = `Deaths: ${json.deaths}`;
  hideKDR.textContent = `K/D: ${kdrCalcHide(
    json.hider_kills,
    json.seeker_kills,
    json.deaths
  )}`;
  hiderKills.textContent = `Hider kills: ${json.hider_kills}`;
  seekerKills.textContent = `Seeker kills: ${json.seeker_kills}`;
}

function fillStatsSG(json) {
  sgXP.textContent = `XP: ${json.xp}`;
  sgTimesPlayed.textContent = `Times played: ${json.played}`;
  sgWins.textContent = `Wins: ${json.victories}`;
  sgFirstPlayed.textContent = `First played: ${unixToNormal(json)}`;
  sgCrates.textContent = `Crates: ${json.crates}`;
  sgDeathmatches.textContent = `Deathmatches: ${json.deathmatches}`;
  sgLootCows.textContent = `Loot cows: ${json.cows}`;
  sgKills.textContent = `Kills: ${json.kills}`;
}

function fillStatsMM(json) {
  mmXP.textContent = `XP: ${json.xp}`;
  mmTimesPlayed.textContent = `Times played: ${json.played}`;
  mmWins.textContent = `Wins: ${json.victories}`;
  mmDeaths.textContent = `Deaths: ${json.deaths}`;
  mmFirstPlayed.textContent = `First played: ${unixToNormal(json)}`;
  mmCoinsCollected.textContent = `Coins collected: ${json.coins}`;
  mmMurders.textContent = `Murders: ${json.murders}`;
  mmMurdererEliminations.textContent = `Murderer eliminations: ${json.murderer_eliminations}`;
  mmKDR.textContent = `K/D: ${kdrCalcHide(
    json.murders,
    json.murderer_eliminations,
    json.deaths
  )}`
}
