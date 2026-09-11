/* ============================================
   CONFIGURATION - EDIT THIS SECTION
   ============================================ */

const CONFIG = {
    // Personalization
    girlfriendName: "HER NAME",
    yourName: "YOUR NAME",

    // Favorite photo (used in favorite photo screen)
    favoritePhoto: "assets/photos/favorite.jpg",

    // Background photo for opening (optional)
    openingBackground: "assets/photos/opening.jpg",
    greetingBackground: "assets/photos/greeting.jpg",

    // Emotional messages between photos
    messages: [
        "LOOK HOW FAR WE'VE COME.",
        "24 MONTHS.",
        "SO MANY MEMORIES.",
        "SO MANY LITTLE MOMENTS.",
        "AND I'M STILL GRATEFUL IT'S YOU."
    ],

    // Music file (optional - won't crash if missing)
    musicFile: "assets/music/song.mp3",

    // Final message customization
    finalMessage: "HAPPY 2ND ANNIVERSARY, MY LOVE.",
    loveMessage: "I LOVE YOU MORE."
};

// Photos array - automatically handles any number of photos
const PHOTOS = [
    { src: "assets/photos/photo-01.jpg", caption: "" },
    { src: "assets/photos/photo-02.jpg", caption: "" },
    { src: "assets/photos/photo-03.jpg", caption: "" }
    // Add more photos here - they'll be displayed in sequence
];

/* ============================================
   APPLICATION STATE
   ============================================ */

let appState = {
    currentScreen: 0,
    isPlaying: false,
    audioElement: null,
    photos: [],
    loadedPhotos: []
};

/* ============================================
   INITIALIZATION
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    console.log("🎬 Initializing 24 Months of Us...");
    loadPhotos();
    initExperience();
    initMusic();
    console.log("✅ App initialized");
}

/* ============================================
   PHOTO LOADING
   ============================================ */

function loadPhotos() {
    console.log("📸 Loading photos...");
    appState.photos = PHOTOS.filter(photo => photo && photo.src);
    console.log(`✅ ${appState.photos.length} photos loaded`);
}

/* ============================================
   EXPERIENCE FLOW
   ============================================ */

function initExperience() {
    const app = document.getElementById("app");
    if (!app) return;

    // Create all screens
    createAllScreens(app);

    // Start the experience
    showIntro();
}

function createAllScreens(container) {
    // Opening screen
    container.appendChild(createOpeningScreen());

    // Greeting screen
    container.appendChild(createGreetingScreen());

    // Twenty four screen
    container.appendChild(createTwentyFourScreen());

    // Love message screen
    container.appendChild(createLoveScreen());

    // Photo screens
    createPhotoScreens(container);

    // Message screens
    createMessageScreens(container);

    // Favorite photo screen
    container.appendChild(createFavoriteScreen());

    // Final screen
    container.appendChild(createFinalScreen());
}

/* ============================================
   SCREEN CREATION FUNCTIONS
   ============================================ */

function createOpeningScreen() {
    const screen = document.createElement("div");
    screen.className = "screen opening-screen";
    screen.id = "opening-screen";
    screen.style.backgroundImage = `url('${CONFIG.openingBackground || ""}')`;

    const content = document.createElement("div");
    content.className = "opening-content";

    const line = document.createElement("div");
    line.className = "opening-line serif-title";
    line.textContent = "WAIT...";

    const subline = document.createElement("div");
    subline.className = "opening-line serif-title";
    subline.style.animationDelay = "0.3s";
    subline.textContent = "I MADE SOMETHING FOR YOU.";

    const greeting = document.createElement("div");
    greeting.className = "opening-greeting serif-title";
    greeting.textContent = "HEY, MY LOVE...";

    const anniversary = document.createElement("div");
    anniversary.className = "opening-anniversary serif-title";
    anniversary.textContent = "HAPPY 2ND ANNIVERSARY! 🥹";

    content.appendChild(line);
    content.appendChild(subline);
    content.appendChild(greeting);
    content.appendChild(anniversary);
    screen.appendChild(content);

    return screen;
}

function createGreetingScreen() {
    const screen = document.createElement("div");
    screen.className = "screen greeting-screen hidden";
    screen.id = "greeting-screen";
    screen.style.backgroundImage = `url('${CONFIG.greetingBackground || ""}')`;

    const content = document.createElement("div");
    content.className = "greeting-content";

    const first = document.createElement("div");
    first.className = "greeting-first serif-title";
    first.textContent = "HEY, YOU...";

    const second = document.createElement("div");
    second.className = "greeting-second serif-title";
    second.textContent = "YES, YOU. 🥹";

    const third = document.createElement("div");
    third.className = "greeting-third serif-title";
    third.textContent = "I HAVE A LITTLE SURPRISE FOR YOU.";

    const fourth = document.createElement("div");
    fourth.className = "greeting-third serif-title";
    fourth.style.animationDelay = "4.5s";
    fourth.textContent = "HAPPY 2ND ANNIVERSARY, MY LOVE.";

    content.appendChild(first);
    content.appendChild(second);
    content.appendChild(third);
    content.appendChild(fourth);
    screen.appendChild(content);

    return screen;
}

function createTwentyFourScreen() {
    const screen = document.createElement("div");
    screen.className = "screen twentyfour-screen hidden";
    screen.id = "twentyfour-screen";

    const number = document.createElement("div");
    number.className = "number-24 serif-title";
    number.textContent = "24";

    const months = document.createElement("div");
    months.className = "months-text serif-title";
    months.textContent = "MONTHS OF US";

    const counting = document.createElement("div");
    counting.className = "counting-text serif-title";
    counting.textContent = "AND STILL COUNTING.";

    screen.appendChild(number);
    screen.appendChild(months);
    screen.appendChild(counting);

    return screen;
}

function createLoveScreen() {
    const screen = document.createElement("div");
    screen.className = "screen love-screen hidden";
    screen.id = "love-screen";

    const loveNumber = document.createElement("div");
    loveNumber.className = "love-number serif-title";
    loveNumber.textContent = "24";

    const loveMessage = document.createElement("div");
    loveMessage.className = "love-message serif-title";
    loveMessage.textContent = "I LOVE YOU";

    const subtitle = document.createElement("div");
    subtitle.className = "love-subtitle serif-title";
    subtitle.textContent = "MORE THAN WORDS CAN EXPLAIN.";

    const extended = document.createElement("div");
    extended.className = "love-extended serif-title";
    extended.textContent = CONFIG.loveMessage;

    screen.appendChild(loveNumber);
    screen.appendChild(loveMessage);
    screen.appendChild(subtitle);
    screen.appendChild(extended);

    return screen;
}

function createPhotoScreens(container) {
    appState.photos.forEach((photo, index) => {
        const screen = document.createElement("div");
        screen.className = "screen photo-screen hidden";
        screen.id = `photo-screen-${index}`;

        const content = document.createElement("div");
        content.className = "photo-content";

        const img = document.createElement("img");
        img.className = "photo-image";
        img.src = photo.src;
        img.alt = `Memory ${index + 1}`;
        img.onerror = () => {
            console.warn(`Photo not found: ${photo.src}`);
            screen.classList.add("hidden");
        };

        content.appendChild(img);
        screen.appendChild(content);
        container.appendChild(screen);
    });
}

function createMessageScreens(container) {
    CONFIG.messages.forEach((message, index) => {
        const screen = document.createElement("div");
        screen.className = "screen message-screen hidden";
        screen.id = `message-screen-${index}`;

        const text = document.createElement("div");
        text.className = `message-text serif-title delayed-${(index % 5) + 1}`;
        text.textContent = message;

        screen.appendChild(text);
        container.appendChild(screen);
    });
}

function createFavoriteScreen() {
    const screen = document.createElement("div");
    screen.className = "screen favorite-screen hidden";
    screen.id = "favorite-screen";
    screen.style.backgroundImage = `url('${CONFIG.favoritePhoto}')`;

    const content = document.createElement("div");
    content.className = "favorite-content";

    const textBefore = document.createElement("div");
    textBefore.className = "favorite-text serif-title";
    textBefore.textContent = "IF I HAD TO CHOOSE ONE...";

    const textChoice = document.createElement("div");
    textChoice.className = "favorite-text serif-title";
    textChoice.style.animationDelay = "1s";
    textChoice.textContent = "THIS ONE.";

    const img = document.createElement("img");
    img.className = "favorite-photo";
    img.src = CONFIG.favoritePhoto;
    img.alt = "Our favorite memory";
    img.onerror = () => {
        console.warn(`Favorite photo not found: ${CONFIG.favoritePhoto}`);
    };

    content.appendChild(textBefore);
    content.appendChild(textChoice);
    content.appendChild(img);
    screen.appendChild(content);

    return screen;
}

function createFinalScreen() {
    const screen = document.createElement("div");
    screen.className = "screen final-screen hidden";
    screen.id = "final-screen";

    const final24 = document.createElement("div");
    final24.className = "final-24 serif-title";
    final24.textContent = "24 MONTHS.";

    const choose = document.createElement("div");
    choose.className = "final-choose serif-title";
    choose.textContent = "AND I'D STILL CHOOSE YOU.";

    const anniversary = document.createElement("div");
    anniversary.className = "final-anniversary serif-title";
    anniversary.textContent = CONFIG.finalMessage;

    const love = document.createElement("div");
    love.className = "final-love serif-title";
    love.textContent = "I LOVE YOU. 🥹";

    const title = document.createElement("div");
    title.className = "final-title serif-title";
    title.textContent = "24 MONTHS OF US";

    const subtitle = document.createElement("div");
    subtitle.className = "final-subtitle serif-title";
    subtitle.textContent = "...and this is only the beginning.";

    screen.appendChild(final24);
    screen.appendChild(choose);
    screen.appendChild(anniversary);
    screen.appendChild(love);
    screen.appendChild(title);
    screen.appendChild(subtitle);

    return screen;
}

/* ============================================
   SCREEN NAVIGATION
   ============================================ */

function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    // Show target screen
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.remove("hidden");
        console.log(`📺 Showing: ${screenId}`);
    }
}

function showIntro() {
    showScreen("opening-screen");
    setTimeout(showGreeting, 5000);
}

function showGreeting() {
    showScreen("greeting-screen");
    setTimeout(showTwentyFour, 6500);
}

function showTwentyFour() {
    showScreen("twentyfour-screen");
    setTimeout(showLoveMessage, 3500);
}

function showLoveMessage() {
    showScreen("love-screen");
    setTimeout(startPhotoSequence, 6000);
}

function startPhotoSequence() {
    let currentPhotoIndex = 0;
    let messageIndex = 0;

    function showNextItem() {
        const totalItems = appState.photos.length + CONFIG.messages.length;
        const totalShown = currentPhotoIndex + messageIndex;

        if (totalShown >= totalItems) {
            showFavoritePhoto();
            return;
        }

        if (currentPhotoIndex < appState.photos.length) {
            showScreen(`photo-screen-${currentPhotoIndex}`);
            currentPhotoIndex++;
            setTimeout(showNextItem, 3500);
        } else if (messageIndex < CONFIG.messages.length) {
            showScreen(`message-screen-${messageIndex}`);
            messageIndex++;
            setTimeout(showNextItem, 4000);
        }
    }

    // Start with first photo
    if (appState.photos.length > 0) {
        showScreen(`photo-screen-0`);
        currentPhotoIndex = 1;
        setTimeout(showNextItem, 3500);
    } else {
        showFavoritePhoto();
    }
}

function showFavoritePhoto() {
    showScreen("favorite-screen");
    setTimeout(showFinalMessage, 5000);
}

function showFinalMessage() {
    showScreen("final-screen");
}

/* ============================================
   MUSIC CONTROL
   ============================================ */

function initMusic() {
    const musicFile = CONFIG.musicFile;
    
    if (!musicFile || musicFile === "assets/music/song.mp3") {
        console.log("🎵 No music file configured");
        return;
    }

    appState.audioElement = document.getElementById("bgMusic");
    
    if (!appState.audioElement) {
        console.warn("Audio element not found");
        return;
    }

    // Create music control button
    const musicControl = document.createElement("div");
    musicControl.className = "music-control";
    musicControl.innerHTML = "🔊";
    musicControl.title = "Toggle music";

    // Check if music file exists
    const audio = new Audio(musicFile);
    audio.addEventListener("canplay", () => {
        document.body.appendChild(musicControl);
        
        musicControl.addEventListener("click", (e) => {
            e.preventDefault();
            toggleMusic();
        });

        console.log("🎵 Music control ready");
    });

    audio.addEventListener("error", () => {
        console.log("🎵 Music file not found, skipping music control");
    });

    appState.audioElement.src = musicFile;
    appState.audioElement.loop = true;
    appState.audioElement.volume = 0.3;
}

function toggleMusic() {
    if (!appState.audioElement) return;

    if (appState.isPlaying) {
        appState.audioElement.pause();
        appState.isPlaying = false;
        document.querySelector(".music-control").innerHTML = "🔇";
    } else {
        appState.audioElement.play().catch(err => {
            console.warn("Could not play music:", err);
        });
        appState.isPlaying = true;
        document.querySelector(".music-control").innerHTML = "🔊";
    }
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Log initial state
console.log("🎬 24 Months of Us - Anniversary Website");
console.log("📸 Photos configured:", appState.photos.length);
console.log("💌 Messages configured:", CONFIG.messages.length);
console.log("🎵 Music file:", CONFIG.musicFile);
