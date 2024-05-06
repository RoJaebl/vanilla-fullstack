const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
video.volume = 0.5;

const handlePlayClick = (e) => {
  video.paused ? video.play() : video.pause();
  playBtn.innerText = video.paused ? "Play" : "Pause";
};
const handleMute = (e) => {
  video.muted = !video.muted;
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : video.volume;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  video.volume = value;
};

const formatTime = (seconds) => {
  const time = new Date(seconds * 1000)
    .toISOString()
    .substring(11, 19)
    .replace(/:/g, "");
  const timestr = Number(time).toString().padStart(3, "0");

  const hour = timestr.slice(-6, -4) + ":";
  const min = timestr.slice(-4, -2) + ":";
  const sec = timestr.slice(-2);
  return (3600 <= seconds ? hour : "") + min + sec;
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};
const handleTimelineChange = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};
const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};

const handleMouseMove = () => {
  videoControls.classList.add("showing");
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(() => {
    videoControls.classList.remove("showing");
  }, 3000);
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);