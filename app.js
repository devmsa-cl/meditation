window.addEventListener('DOMContentLoaded', () => {
  const audioElement = document.querySelector('#audioElement');
  const play = document.querySelector('.play');
  const timeSelect = document.querySelectorAll('.time-select button');
  const outline = document.querySelector('.outline-track circle');
  const displayTimer = document.querySelector('.time-display');

  const outlineLength = outline.getTotalLength();

  outline.style.strokeDashoffset = outlineLength;
  outline.style.strokeDasharray = outlineLength;

  let playTime = 5;

  timeSelect.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      playTime = +e.target.dataset.time;
      displayTimer.textContent = `${playTime / 60}:00`;
      audioElement.currentTime = 0;
      checkPlaying(audioElement);
    });
  });

  play.addEventListener('click', () => {
    checkPlaying(audioElement);
  });

  const checkPlaying = (audio) => {
    if (audio.paused) {
      audio.play();
      play.src = '/assets/svg/pause.svg';
    } else {
      audio.pause();
      play.src = '/assets/svg/play.svg';
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
      displayTimer.textContent = '0:00';
      play.src = '/assets/svg/play.svg';
      audioElement.pause();
      audioElement.currentTime = 0;
      outline.style.strokeDashoffset = outlineLength;
      outline.style.strokeDasharray = outlineLength;
      playTime = playTime;
    }
  };
});
