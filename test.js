// Needed elements
const btn = document.getElementById("search-btn"); // Get the button element by its ID
const inputWord = document.getElementById("search-input"); // Get the input element by its ID
const result = document.getElementById("result"); // Get the result div element by its ID

// Add a click event listener to the button
btn.addEventListener("click", async () => {
  const inputData = inputWord.value.trim(); // Get the value from the input field and trim any whitespace

  // Check if the input is not empty
  if (inputData !== "") {
    try {
      // Fetch data from the API using the input word
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${inputData}`
      );

      // Check if the response is not OK
      if (!response.ok) {
        if (response.status === 404) {
          // Check if the status is 404 (Not Found)
          result.innerHTML = `Resource not found (404)`; // Update the result element with a 404 message
        } else {
          result.innerHTML = `HTTP error! status: ${response.status}`; // Update the result element with a generic error message
        }
        return; // Stop further execution if there's an error
      }

      // Parse the JSON data from the response
      const data = await response.json();
      // Display the fetched data in the result element, formatted as a JSON string
      result.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
      // Log any errors to the console
      console.error("An error occurred while fetching data:", error);
      // Update the result element with a generic error message
      result.innerHTML = `An error occurred while fetching data. Please try again later.`;
    }
  } else {
    // If the input is empty, prompt the user to enter a word
    result.innerHTML = `Please enter a word to search.`;
  }
});
