/**
 * Handles form submission to get dealt cards.
 * @async
 */
async function submitForm() {
    try {
        // Fetch the number of players from the input field
        const numPlayers = document.getElementById('numPlayers').value;

        // Make an asynchronous GET request to the server
        const { data: { dealt } } = await axios.get(`/dealt-cards?people=${numPlayers}`);

        // Display the result section
        document.getElementById('resultSection').style.display = 'block';

        // Update the dealt cards list in the UI
        const dealtCardsList = document.getElementById('dealtCardsList');
        dealtCardsList.innerHTML = ''; // Clear previous results

        // Populate the UI with the dealt cards
        dealt.forEach((card) => {
            const listItem = document.createElement('li');
            listItem.classList.add('flex', 'items-center', 'justify-between', 'mb-2')
            listItem.textContent = card;
            dealtCardsList.appendChild(listItem);
        });
    } catch (error) {
        // Log errors to the console and show an alert to the user
        console.error('An error occurred:', error);
        alert('Irregularity occurred');
    }
}
