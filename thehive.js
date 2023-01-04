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
const mmMurdererEliminations = document.getElementById(
  "mmMurdererEliminations"
);
const mmKDR = document.getElementById("mmKDR");

// get skywars stats elements
const skyXP = document.getElementById("skyXP");
const skyTimesPlayed = document.getElementById("skyTimesPlayed");
const skyWins = document.getElementById("skyWins");
const skyKills = document.getElementById("skyKills");
const skyFirstPlayed = document.getElementById("skyFirstPlayed");
const skyMysteryChestsDestroyed = document.getElementById(
  "skyMysteryChestsDestroyed"
);
const skyOresMined = document.getElementById("skyOresMined");
const skySpellbooksUsed = document.getElementById("skySpellbooksUsed");

// get ctf stats elements
const ctfXP = document.getElementById("ctfXP");
const ctfTimesPlayed = document.getElementById("ctfTimesPlayed");
const ctfWins = document.getElementById("ctfWins");
const ctfKills = document.getElementById("ctfKills");
const ctfAssists = document.getElementById("ctfAssists");
const ctfDeaths = document.getElementById("ctfDeaths");
const ctfKDR = document.getElementById("ctfKDR");
const ctfFirstPlayed = document.getElementById("ctfFirstPlayed");
const ctfFlagsCaptured = document.getElementById("ctfFlagsCaptured");
const ctfFlagsReturned = document.getElementById("ctfFlagsReturned");

// get block drop stats elements
const bdXP = document.getElementById("bdXP");
const bdTimesPlayed = document.getElementById("bdTimesPlayed");
const bdWins = document.getElementById("bdWins");
const bdDeaths = document.getElementById("bdDeaths");
const bdBlocksDestroyed = document.getElementById("bdBlocksDestroyed");
const bdFirstPlayed = document.getElementById("bdBlocksDestroyed");
const bdPowerupsCollected = document.getElementById("bdPowerupsCollected");
const bdVaultsUsed = document.getElementById("bdVaultsUsed");

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    onBtnClick();
  }
});

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
        if (json.length != 0) {
          statsFunction(json);
        }
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
  getStats("sky", fillStatsSkywars);
  getStats("ctf", fillStatsCtf);
  getStats("drop", fillStatsBlockDrop);
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

function kdrCalcMulti(jsonKills1, jsonKills2, jsonDeaths) {
  let totalKills = jsonKills1 + jsonKills2;
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
  hideKDR.textContent = `K/D: ${kdrCalcMulti(
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
  mmKDR.textContent = `K/D: ${kdrCalcMulti(
    json.murders,
    json.murderer_eliminations,
    json.deaths
  )}`;
}

function fillStatsSkywars(json) {
  skyXP.textContent = `XP: ${json.xp}`;
  skyTimesPlayed.textContent = `Times played: ${json.played}`;
  skyWins.textContent = `Wins: ${json.victories}`;
  skyKills.textContent = `Kills: ${json.kills}`;
  skyFirstPlayed.textContent = `First played: ${unixToNormal(json)}`;
  skyMysteryChestsDestroyed.textContent = `Mystery Chests destroyed: ${json.mystery_chests_destroyed}`;
  skyOresMined.textContent = `Ores mined: ${json.ores_mined}`;
  skySpellbooksUsed.textContent = `Spellbooks used: ${json.spells_used}`;
}

function fillStatsCtf(json) {
  ctfXP.textContent = `XP: ${json.xp}`;
  ctfTimesPlayed.textContent = `Times played: ${json.played}`;
  ctfWins.textContent = `Wins: ${json.victories}`;
  ctfKills.textContent = `Kills: ${json.kills}`;
  ctfAssists.textContent = `Assists: ${json.assists}`;
  ctfDeaths.textContent = `Deaths: ${json.deaths}`;
  ctfKDR.textContent = `K/D: ${kdrCalcMulti(
    json.kills,
    json.assists,
    json.deaths
  )}`;
  ctfFirstPlayed.textContent = `First played: ${unixToNormal(json)}`;
  ctfFlagsCaptured.textContent = `Flags captured: ${json.flags_captured}`;
  ctfFlagsReturned.textContent = `Flags returned: ${json.flags_returned}`;
}

function fillStatsBlockDrop(json) {
  bdXP.textContent = `XP: ${json.xp}`;
  bdTimesPlayed.textContent = `Times played: ${json.played}`;
  bdDeaths.textContent = `Deaths: ${json.deaths}`;
  bdBlocksDestroyed.textContent = `Blocks destroyed: ${json.blocks_destroyed}`;
  bdFirstPlayed.textContent = `First played: ${unixToNormal(json)}`;
  bdPowerupsCollected.textContent = `Powerups collected: ${json.powerups_collected}`;
  bdVaultsUsed.textContent = `Vaults used: ${json.vaults_used}`;
}
