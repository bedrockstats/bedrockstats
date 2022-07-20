const userInput = document.getElementById("userInput");

function getStats() {
  const username = userInput.value; // this will be used in the api request

  fetch(`https://api.hyperlandsmc.net/stats/${username}`)
    .then((response) => response.json())
    .then((json) => console.log(json.stats));
}
