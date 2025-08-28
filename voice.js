// Speech setup with a Start button to unlock mic + audio
(function () {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const startBtn = document.getElementById("startBtn");
  const heardEl  = document.getElementById("heard");

  if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition. Please use Google Chrome.");
    if (startBtn) startBtn.disabled = true;
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;

  let listening = false;

  function updateHeard(text) {
    if (heardEl) heardEl.textContent = "Heard: " + text;
  }

  function handleCommand(transcript) {
    const t = transcript.toLowerCase();

    // Optional: ignore the name "bheem"
    const cmd = t.replace(/\bbheem\b/g, "").trim();
    updateHeard(cmd);

    if (cmd.includes("angry"))          return changeAnimation("angry");
    if (cmd.includes("dance"))          return changeAnimation("dance");
    if (cmd.includes("eat"))            return changeAnimation("eating");
    if (cmd.includes("fight"))          return changeAnimation("fighting");
    if (cmd.includes("friend"))         return changeAnimation("friends");
    if (cmd.includes("school"))         return changeAnimation("school");
    if (cmd.includes("video game") ||
        cmd.includes("video games") ||
        cmd.includes("gaming"))         return changeAnimation("videogames");
    if (cmd.includes("play"))           return changeAnimation("playing");
    if (cmd.includes("pray"))           return changeAnimation("praying");
    if (cmd.includes("read"))           return changeAnimation("reading");
    if (cmd.includes("study") ||
        cmd.includes("studying"))       return changeAnimation("studying");
    if (cmd.includes("wake"))           return changeAnimation("wakeup");

    // default
    changeAnimation("idle");
  }

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript || "";
    handleCommand(transcript);
  };

  recognition.onend = () => {
    if (listening) recognition.start();
  };

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      // 1) unlock audio
      unlockAudio();
      // 2) start mic
      if (!listening) {
        recognition.start();
        listening = true;
        startBtn.classList.add("listening");
        startBtn.textContent = "🛑 Stop Listening";
        document.getElementById("status").textContent = "Listening… ";
      } else {
        recognition.stop();
        listening = false;
        startBtn.classList.remove("listening");
        startBtn.textContent = "▶ Start";
        document.getElementById("status").textContent = "Stopped. Click Start to listen again.";
      }
    });
  } else {
    // if button missing, still attempt to start mic (may be blocked)
    recognition.start();
  }
})();
