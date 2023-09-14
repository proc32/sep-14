const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "H2Ipo_pvI562sf7iySYU19gtrtDxMKfg0RnOq2P98SI"; // replace with your Unsplash API key

let currentIndex = -1;
let previousQuery = '';

async function fetchImage() {
    const query = document.getElementById('textInput').value;

    // Reset currentIndex if the query changes.
    if (previousQuery !== query) {
        currentIndex = -1;
        previousQuery = query;
    }

    const response = await fetch(`${API_URL}?query=${query}&client_id=${API_KEY}`);
    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
        // Increment currentIndex and wrap around if it exceeds the number of results.
        currentIndex = (currentIndex + 1) % data.results.length;
        const imageUrl = data.results[currentIndex].urls.small;
        document.getElementById('resultImage').src = imageUrl;
    } else {
        alert('No images found for this description.');
    }
}