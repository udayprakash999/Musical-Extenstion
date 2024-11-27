const toggle = document.querySelector('.toggle');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const moodTracks = {
    motivational: ["motivational/Eminem - Lose Yourself.mp3", "motivational/Survivor - Eye of the Tiger.mp3", "motivational/Journey - Don't Stop Believing.mp3"],
    focus: ["focus/focus1.mp3", "focus/focus2.mp3"],
    melodic: ["melodic/melodic1.mp3", "melodic/melodic2.mp3"],
    dreamy: ["dreamy/dreamy1.mp3", "dreamy/dreamy2.mp3"],
    nostalgic: ["nostalgic/nostalgic1.mp3", "nostalgic/nostalgic2.mp3"],
    energetic: ["energetic/energetic1.mp3", "energetic/energetic2.mp3"],
    romantic: ["romantic/romantic1.mp3", "romantic/romantic2.mp3"],
};

let currentTracks = [];
let currentIndex = 0;
let audio = new Audio();

const moodSelect = document.getElementById("mood-select");
const startBtn = document.getElementById("start-btn");
const replayBtn = document.getElementById("replay-btn");
const pauseBtn = document.getElementById("pause-btn");
const nextBtn = document.getElementById("next-btn");
const volumeUpBtn = document.getElementById("volume-up-btn");
const volumeDownBtn = document.getElementById("volume-down-btn");
const volumeSlider = document.getElementById("volume-slider");
const volumePercentage = document.getElementById("volume-percentage");
const playerControls = document.getElementById("player-controls");
const currentTrackText = document.getElementById("current-track");

// Event listeners
startBtn.addEventListener("click", () => {
    const selectedMood = moodSelect.value;
    if (selectedMood && moodTracks[selectedMood]) {
        startPlaylist(moodTracks[selectedMood]);
    } else {
        alert("Please select a mood!");
    }
});

replayBtn.addEventListener("click", () => {
    audio.currentTime = 0; // Reset the current track's time to 0
    audio.play(); // Play the track from the beginning
    pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause'; // Update the pause button
});

pauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    } else {
        audio.pause();
        pauseBtn.innerHTML = '<i class="fas fa-play"></i> Play';
    }
});

nextBtn.addEventListener("click", () => {
    playNextTrack();
});

volumeUpBtn.addEventListener("click", () => {
    adjustVolume(10); // Increase volume by 10%
});

volumeDownBtn.addEventListener("click", () => {
    adjustVolume(-10); // Decrease volume by 10%
});

volumeSlider.addEventListener("input", () => {
    setVolume(volumeSlider.value); // Set volume based on slider position
});

// Start playlist function
function startPlaylist(tracks) {
    currentTracks = tracks;
    currentIndex = 0;
    playerControls.classList.remove("hidden");
    playTrack();
}

// Play the current track
function playTrack() {
    if (currentTracks.length > 0) {
        audio.src = currentTracks[currentIndex];
        audio.play().catch(error => {
            alert("Failed to play the audio file. Error: " + error.message);
        });
        currentTrackText.textContent = `Playing: ${currentTracks[currentIndex].split("/").pop()}`;
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    }
}

// Play the next track in the playlist
function playNextTrack() {
    currentIndex = (currentIndex + 1) % currentTracks.length;
    playTrack();
}

// Adjust the volume based on change in percentage
function adjustVolume(change) {
    let newVolume = audio.volume * 100 + change; 
    newVolume = Math.max(0, Math.min(100, newVolume)); 
    setVolume(newVolume);
}

// Set the volume of the audio player
function setVolume(value) {
    audio.volume = value / 100;
    volumeSlider.value = value;
    volumePercentage.textContent = `${value}%`; 
}

// Toggle dark/light mode
toggle.addEventListener('click', (e) => {
    const html = document.querySelector('body');
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        e.target.innerHTML = 'Dark mode';
    } else {
        html.classList.add('dark');
        e.target.innerHTML = 'Light mode';
    }
});

//time & date
function setTime() {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}
setTime();

const arrayOfQuotes = [
    { quote: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { quote: "Your time is limited, don’t waste it living someone else’s life.", author: "Steve Jobs" },
    { quote: "Life is short, and it's up to you to make it sweet.", author: "Sarah Louise Delany" },
    { quote: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
    { quote: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
    { quote: "The best revenge is massive success.", author: "Frank Sinatra" },
    { quote: "Don’t count the days, make the days count.", author: "Muhammad Ali" },
    { quote: "Life isn’t about finding yourself. It’s about creating yourself.", author: "George Bernard Shaw" },
    { quote: "If opportunity doesn’t knock, build a door.", author: "Milton Berle" },
    { quote: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { quote: "I never dreamed about success. I worked for it.", author: "Estee Lauder" },
    { quote: "Don’t be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { quote: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
    { quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { quote: "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.", author: "Winston Churchill" },
    { quote: "Try not to become a man of success, but rather try to become a man of value.", author: "Albert Einstein" },
    { quote: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { quote: "If you are not willing to risk the usual, you will have to settle for the ordinary.", author: "Jim Rohn" },
    { quote: "Great things never come from comfort zones.", author: "Unknown" },
    { quote: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { quote: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { quote: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
    { quote: "What we achieve inwardly will change outer reality.", author: "Plutarch" },
    { quote: "We may encounter many defeats but we must not be defeated.", author: "Maya Angelou" },
    { quote: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" },
    { quote: "The best way out is always through.", author: "Robert Frost" },
    { quote: "Perfection is not attainable, but if we chase perfection we can catch excellence.", author: "Vince Lombardi" },
    { quote: "It is never too late to be what you might have been.", author: "George Eliot" },
    { quote: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
    { quote: "The only journey is the one within.", author: "Rainer Maria Rilke" },
    { quote: "The best preparation for tomorrow is doing your best today.", author: "H. Jackson Brown, Jr." },
    { quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { quote: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
    { quote: "Don’t wait. The time will never be just right.", author: "Napoleon Hill" },
    { quote: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
];

function generateQuote() {
    const random = Math.floor(Math.random() * arrayOfQuotes.length);
    document.querySelector('#quoteOutput').textContent = `"${arrayOfQuotes[random].quote}"`;
    document.querySelector('#authorOutput').textContent = `--${arrayOfQuotes[random].author}`;
}

// Automatically call the function when the page loads
window.onload = generateQuote;
