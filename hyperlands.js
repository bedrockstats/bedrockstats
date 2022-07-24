const userInput = document.getElementById("userInput");
const responseStatus = document.getElementById("responseStatus");

// get bw stats elements
const bwBedsBroken = document.getElementById("bwBedsBroken");
const bwBestWinstreak = document.getElementById("bwBestWinstreak");
const bwCurrentWinstreak = document.getElementById("bwCurrentWinstreak");
const bwFinalKills = document.getElementById("bwFinalKills");
const bwKills = document.getElementById("bwKills");
const bwWins = document.getElementById("bwWins");

// get duels stats elements
const duelsElo = document.getElementById("duelsElo");
const duelsBestWinstreak = document.getElementById("duelsBestWinstreak");
const duelsCurrentWinstreak = document.getElementById("duelsCurrentWinstreak");
const duelsArcherWins = document.getElementById("duelsArcherWins");
const duelsBuildUhcWins = document.getElementById("duelsBuildUhcWins");
const duelsIronWins = document.getElementById("duelsIronWins");
const duelsPotPvpWins = document.getElementById("duelsPotPvpWins");
const duelsSumoWins = document.getElementById("duelsSumoWins");

function handleErrors(response) {
  response.json().then(function (json) {
    if (!response.ok) {
      responseStatus.style.display = "block";
      responseStatus.style.color = "crimson";
      responseStatus.textContent = json.error;
    }
    if (response.ok) {
      responseStatus.style.display = "block";
      responseStatus.style.color = "#59bd59";
      responseStatus.textContent = `API request succeeded! (Status code: ${response.status})`
      fillStats(json.stats)
    }
    });
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

function getStats() {
  const username = userInput.value; // this will be used in the api request

  fetch(`https://api.hyperlandsmc.net/stats/${username}`)
    .then(handleErrors)
}

function fillStats(json) {
  // bw stats
  bwBedsBroken.textContent = `Beds broken: ${json.bedwars.bedsBroken}`;
  bwBestWinstreak.textContent = `Best winstreak: ${json.bedwars.bestWinstreak}`;
  bwCurrentWinstreak.textContent = `Current winstreak: ${json.bedwars.currentWinstreak}`;
  bwFinalKills.textContent = `Final Kills: ${json.bedwars.finalKills}`;
  bwKills.textContent = `Kills: ${json.bedwars.kills}`;
  bwWins.textContent = `Wins: ${json.bedwars.wins}`;

  // duels stats
  duelsElo.textContent = `Elo: ${json.duels.elo}`;
  duelsBestWinstreak.textContent = `Best winstreak: ${json.duels.bestWinstreak}`;
  duelsCurrentWinstreak.textContent = `Current winstreak: ${json.duels.currentWinstreak}`;
  duelsArcherWins.textContent = `Archer wins: ${json.duels.archerWins}`;
  duelsBuildUhcWins.textContent = `BuildUHC wins: ${json.duels.buildUhcWins}`;
  duelsIronWins.textContent = `Iron wins: ${json.duels.ironWins}`;
  duelsPotPvpWins.textContent = `PotPVP wins: ${json.duels.potWins}`;
  duelsSumoWins.textContent = `Sumo wins: ${json.duels.sumoWins}`;
}
