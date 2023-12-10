/**
 * Handles form submission to get dealt cards.
 * @async
 */
async function submitForm() {
    try {
        const numPlayersInput = document.getElementById("numPlayers");
        const numPlayers = numPlayersInput.value;
        const dealtCardsList = document.getElementById("dealtCardsList");
        const resultWrap = document.getElementById("resultSection");
        const errorMessage = document.getElementById("errorMessage");

        // Clear previous results and error messages
        dealtCardsList.innerHTML = "";
        errorMessage.innerText = "";
        errorMessage.style.display = "none";

        // Hide the result section
        resultWrap.style.display = "none";

        // Make an asynchronous GET request to the server
        const response = await axios.get(`/dealt-cards?people=${numPlayers}`);
        const dealt = response.data.dealt;

        // Display the result section
        resultWrap.style.display = "block";

        // Populate the UI with the dealt cards
        dealt.forEach((card) => {
            const listItem = document.createElement("li");
            listItem.classList.add("flex", "items-center", "justify-between", "mb-2");
            listItem.textContent = card;
            dealtCardsList.appendChild(listItem);
        });
    } catch (error) {
        handleSubmissionError(error);
    }
}

/**
 * Handles errors that occur during form submission.
 * @param {Error} error - The error object.
 */
function handleSubmissionError(error) {
    const errorMessage = document.getElementById("errorMessage");

    if (_.has(error, "response.data.error")) {
        // Display the server-provided error message
        errorMessage.innerText = error.response.data.error;
        errorMessage.style.display = "block";
    } else {
        // Log errors to the console and show a generic alert to the user
        console.error("An error occurred:", error);
        errorMessage.innerText = "Irregularity occurred";
        errorMessage.style.display = "block";
    }
}
