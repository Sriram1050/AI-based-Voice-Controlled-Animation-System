// Audio paths (under assets/sounds/)
const sounds = {
  angry: new Audio("assets/sounds/angry.mp3"),
  dance: new Audio("assets/sounds/dance.mp3"),
  eating: new Audio("assets/sounds/eating.mp3"),
  fighting: new Audio("assets/sounds/fighting.mp3"),
  friends: new Audio("assets/sounds/friends.mp3"),
  school: new Audio("assets/sounds/going_to_school.mp3"),
  videogames: new Audio("assets/sounds/playing_video_games.mp3"),
  playing: new Audio("assets/sounds/playing.mp3"),
  praying: new Audio("assets/sounds/praying.mp3"),
  reading: new Audio("assets/sounds/reading.mp3"),
  studying: new Audio("assets/sounds/studying.mp3"),
  wakeup: new Audio("assets/sounds/waking_up.mp3")
};

// unlock Chrome autoplay by playing each audio once (muted) on click
function unlockAudio() {
  const list = Object.values(sounds);
  list.forEach(a => { 
    a.muted = true; 
    a.play().then(() => {
      a.pause();
      a.currentTime = 0;
      a.muted = false;
    }).catch(() => { /* ignore */ });
  });
}

function setStatus(text) {
  const el = document.getElementById("status");
  if (el) el.textContent = text;
}

function changeAnimation(action) {
  const pandu = document.getElementById("pandu");
  if (!pandu) return;

  const file = animations[action] || animations.idle;
  pandu.src = file;

  const friendly = {
    angry: "Bheem is angry 😡",
    dance: "Bheem is dancing 💃",
    eating: "Bheem is eating 🍴",
    fighting: "Bheem is fighting 🥊",
    friends: "Bheem is with friends 🤝",
    school: "Bheem is going to school 🎒",
    videogames: "Bheem is playing video games 🎮",
    playing: "Bheem is playing ⚽",
    praying: "Bheem is praying 🙏",
    reading: "Bheem is reading 📖",
    studying: "Bheem is studying 📝",
    wakeup: "Bheem is waking up 🌞",
    idle: "Say a command…"
  };
  setStatus(friendly[action] || friendly.idle);

  // stop all sounds
  Object.values(sounds).forEach(s => { s.pause(); s.currentTime = 0; });
  // play matching
  const sfx = sounds[action];
  if (sfx) {
    sfx.play().catch(err => console.log("Audio play blocked:", err));
  }
}

// Helpful: show if an image path is wrong
const panduImg = document.getElementById("pandu");
if (panduImg) {
  panduImg.addEventListener("error", () => {
    setStatus("❌ Image not found: " + panduImg.src);
  });
}
