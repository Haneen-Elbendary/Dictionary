// Needed elements
const btn = document.getElementById("search-btn");
const inputWord = document.getElementById("search-input");
const result = document.getElementById("result");
btn.addEventListener("click", async () => {
  const inputData = inputWord.value.trim();

  if (inputData !== "") {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${inputData}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          result.innerHTML = `Resource not found (404)`;
          result.style.color = "red";
        } else {
          result.innerHTML = `HTTP error! status: ${response.status}`;
          result.style.color = "red";
        }
        return;
      }

      const data = await response.json();
      result.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mt-md-5">
          <h2 class="text-primary fw-bold ">${inputData}</h2>
           <button id="play-sound-btn" class="btn"> <i class="fa-solid fa-volume-high text-primary"></i></button>
        </div>
        <p class="text-muted mb-md-5">${data[0].meanings[0].partOfSpeech} - ${
        data[0].meanings[1].partOfSpeech
      } ${data[0].phonetic}</p>
        <p class="text-secondary border-left">${
          data[0].meanings[0].definitions[0].definition ||
          "There's No definition"
        }</p>
      `;
      // add sound part
      const audio = new Audio(data[0].phonetics[0].audio);
      const button = document.getElementById("play-sound-btn");
      button.addEventListener("click", () => {
        audio.play();
      });
    } catch (error) {
      console.error("An error occurred while fetching data:", error);

      result.innerHTML = `An error occurred while fetching data. Please try again later.`;
    }
  } else {
    result.innerHTML = `Please enter a word to search.`;
    result.style.color = "red";
  }
});
// Made by Haneen🤍
