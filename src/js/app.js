const userInput = document.getElementById("userInput");

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

function getStats() {
  const username = userInput.value; // this will be used in the api request

  fetch(`https://api.hyperlandsmc.net/stats/${username}`)
    .then((response) => response.json())
    .then((json) => fillStats(json.stats));
}

function fillStats(json) {
  console.log(json);

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
