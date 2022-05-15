const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const CurrentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".full-screen");
const speed = document.querySelector(".player-speed");
const player = document.querySelector(".player");

// Play & Pause ----------------------------------- //

function showplayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showplayIcon();
  }
}

// Progress Bar ---------------------------------- //

//calcuate display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

//update progress bar as video plays
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  CurrentTime.textContent = `${displayTime(video.currentTime)}/`;
  duration.textContent = `${displayTime(video.duration)}`;
}

//click to seek
function setProgress(e) {
  //when i used e.srceleemnt.offset width it works but with stainge issues when clicking on the bar  it wasnt Precision
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = video.duration * newTime;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

//volume bar
function changeVolume(e) {
  const volume = e.offsetX / volumeRange.offsetWidth;
  video.volume = volume;
  volumeBar.style.width = `${volume * 100}%`;
  if (video.volume > 0.9) {
    video.volume = 1;
  }
  if (video.volume < 0.1) {
    video.volume = 0;
  }
  //change icon depending on colume
  volumeIcon.className = "";
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }

  lastVolume = volume;
}

//mute unmute volume
function toggleMute() {
  volumeIcon.classList = "";
  if (video.volume >= 0.1) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    if (lastVolume > 0.7) {
      volumeIcon.classList.add("fas", "fa-volume-up");
    } else if (lastVolume < 0.7 && lastVolume > 0) {
      volumeIcon.classList.add("fas", "fa-volume-down");
    } else if (lastVolume === 0) {
      volumeIcon.classList.add("fas", "fa-volume-off");
    }
  }
}

// Change Playback Speed -------------------- //

function changeSpeed() {
  console.log(speed.value);
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

function fullscreen() {
  /* When the openFullscreen() function is executed, open the video in fullscreen.
   */

  if (player.requestFullscreen) {
    player.requestFullscreen();
    video.classList.add('video-fullscreen')
  }

  //close full screen its not nedded if you used video element because its default appended
  if (document.exitFullscreen) {
    document.exitFullscreen();
    video.classList.remove('video-fullscreen')

  }
}

// Event listner
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("ended", showplayIcon); //on video end , show play icon
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", fullscreen);
video.addEventListener('dblclick',fullscreen)
