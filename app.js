window.addEventListener("DOMContentLoaded", () => {
  const audioElement = document.querySelector("#audioElement");
  const play = document.querySelector(".play");
  const timeSelect = document.querySelectorAll(".time-select button");
  const outline = document.querySelector(".outline-track circle");
  const displayTimer = document.querySelector(".time-display");
  const tracks = [...document.querySelectorAll(".song-select button")];

  const outlineLength = outline.getTotalLength();

  outline.style.strokeDashoffset = outlineLength;
  outline.style.strokeDasharray = outlineLength;

  let playTime = 30;
  let currentBackground =
    "143160-wallpaper-buddha-buddhism-meditation-harmony-silhouette-hd.jpg";
  let currentSong = "JEK9DZZ-the-meditation.mp3";

  //Change track
  tracks.forEach((track) => {
    track.addEventListener("click", (e) => {
      // remove tracks active class
      removeActiveClass();
      // append the active class
      e.target.classList.add("active");
      // pause the current play track
      audioElement.pause();
      // change the play icon
      play.src = "/assets/svg/play.svg";
      // set new track and background
      currentSong = e.target.dataset.song;
      currentBackground = e.target.dataset.bg;
      audioElement.src = "/assets/" + currentSong;
      resetOutline();
      setBackground();
    });
  });

  function removeActiveClass() {
    tracks.forEach((track) => track.classList.remove("active"));
  }
  function setBackground() {
    const bodyElement = document.querySelector("body");
    bodyElement.style.backgroundImage = `url(/assets/${currentBackground})`;

    console.log(
      window.getComputedStyle(bodyElement).getPropertyValue("--main-color")
    );
  }
  function resetOutline() {
    outline.style.strokeDashoffset = outlineLength;
    outline.style.strokeDasharray = outlineLength;
  }

  timeSelect.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (!audioElement.paused) {
        audioElement.pause();
        play.src = "/assets/svg/play.svg";
      }
      playTime = +e.target.dataset.time;
      displayTimer.textContent = `${playTime / 60}:00`;
      audioElement.currentTime = 0;
    });
  });

  play.addEventListener("click", () => {
    checkPlaying(audioElement);
  });

  const checkPlaying = (audio) => {
    if (audio.paused) {
      audio.play();
      play.src = "/assets/svg/pause.svg";
    } else {
      audio.pause();
      play.src = "/assets/svg/play.svg";
    }
  };

  audioElement.ontimeupdate = () => {
    const currentPlayTime = audioElement.currentTime;
    const now = playTime - currentPlayTime;

    const second = Math.floor(now % 60);
    const minute = Math.floor(now / 60);

    let progress = outlineLength + (currentPlayTime / playTime) * outlineLength;
    outline.style.strokeDasharray = progress;

    // Display the time
    displayTimer.textContent = `${minute}:${String(second).padStart(2, 0)}`;

    if (currentPlayTime >= playTime) {
      displayTimer.textContent = "0:00";
      play.src = "/assets/svg/play.svg";
      audioElement.pause();
      audioElement.currentTime = 0;
      outline.style.strokeDashoffset = outlineLength;
      outline.style.strokeDasharray = outlineLength;
      playTime = playTime;
    }
  };
});
