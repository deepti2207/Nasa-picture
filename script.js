const API_KEY = 'bUzqJ4F1BiWFsCFJtEiU1Auv1PUdco662a5kpEhM'; // Replace with your NASA API key
const API_BASE_URL = 'https://api.nasa.gov/planetary/apod';

document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    loadSearchHistory();
    document.getElementById('search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('search-input').value;
        if (date) {
            getImageOfTheDay(date);
        }
    });
});

const getCurrentImageOfTheDay = async () => {
    const currentDate = new Date().toISOString().split('T')[0];
    try {
        const response = await fetch(`${API_BASE_URL}?api_key=${API_KEY}&date=${currentDate}`);
        const data = await response.json();
        displayImage(data);
    } catch (error) {
        console.error('Error fetching current image of the day:', error);
    }
};

const getImageOfTheDay = async (date) => {
    try {
        const response = await fetch(`${API_BASE_URL}?api_key=${API_KEY}&date=${date}`);
        const data = await response.json();
        displayImage(data);
        saveSearch(date);
        addSearchToHistory(date);
    } catch (error) {
        console.error('Error fetching image for the selected date:', error);
    }
};

const displayImage = (data) => {
    document.getElementById('current-image').src = data.url;
    document.getElementById('current-description').textContent = data.explanation;
};

const saveSearch = (date) => {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem('searches', JSON.stringify(searches));
    }
};

const addSearchToHistory = (date) => {
    const searchHistory = document.getElementById('search-history');
    const listItem = document.createElement('li');
    listItem.textContent = date;
    listItem.addEventListener('click', () => {
        getImageOfTheDay(date);
    });
    searchHistory.appendChild(listItem);
};

const loadSearchHistory = () => {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(date => addSearchToHistory(date));
};
