const userInput = document.getElementById("userInput");

// get bw stats elements
const bwBedsBroken = document.getElementById("bwBedsBroken");
const bwBestWinstreak = document.getElementById("bwBestWinstreak");
const bwCurrentWinstreak = document.getElementById("bwCurrentWinstreak");
const bwFinalKills = document.getElementById("bwFinalKills");
const bwKills = document.getElementById("bwKills");
const bwWins = document.getElementById("bwWins");

function getStats() {
  const username = userInput.value; // this will be used in the api request

  fetch(`https://api.hyperlandsmc.net/stats/${username}`)
    .then((response) => response.json())
    .then((json) => fillStats(json.stats));
}

function fillStats(json) {
  // bw stats
  bwBedsBroken.textContent = `Beds broken: ${json.bedwars.bedsBroken}`;
  bwBestWinstreak.textContent = `Best winstreak: ${json.bedwars.bestWinstreak}`;
  bwCurrentWinstreak.textContent = `Current winstreak: ${json.bedwars.currentWinstreak}`;
  bwFinalKills.textContent = `Final Kills: ${json.bedwars.finalKills}`;
  bwKills.textContent = `Kills: ${json.bedwars.kills}`;
  bwWins.textContent = `Wins: ${json.bedwars.wins}`;
}
