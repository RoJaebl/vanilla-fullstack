const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const videoPlayState = document.getElementById("videoPlayState");
const videoPlayStateIcon = videoPlayState.querySelector("i");

video.volume = 0.5;

function Displayer(element, option = { time: 3000 }) {
  this.element = element;
  this.id = null;
  this.option = option;
  this.show = () => {
    this.element.classList.add("showing");
    if (this.id) {
      clearTimeout(this.id);
      this.id = null;
    }
    return this;
  };
  this.hide = () => {
    this.id = setTimeout(() => {
      this.element.classList.remove("showing");
    }, this.option.time);
    return this;
  };
  this.cycle = () => {
    this.show();
    this.hide();
  };
  return this;
}
let controls = new Displayer(videoControls);
let playState = new Displayer(videoPlayState, {
  time: 500,
});

const playClick = () => {
  video.paused ? video.play() : video.pause();
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
  videoPlayStateIcon.classList = video.paused
    ? "fa-solid fa-pause fa-5x"
    : "fa-solid fa-play fa-5x";
};
const handlePlayClick = () => playClick;
const handleMute = () => {
  video.muted = !video.muted;
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
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
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};
const handleMouseMove = () => {
  controls.cycle();
};
const handleMouseLeave = () => {
  controls.hide();
};
const handlePlayContainer = () => {
  playClick();
  controls.cycle();
  playState.cycle();
};
const handlePlayKeyPress = (e) => {
  if (e.code === "Space") {
    playClick();
    controls.cycle();
    playState.cycle();
  }
};
const handleEnded = async (e) => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/views`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
videoContainer.addEventListener("click", handlePlayContainer);
document.addEventListener("keypress", handlePlayKeyPress);
video.addEventListener("ended", handleEnded);
