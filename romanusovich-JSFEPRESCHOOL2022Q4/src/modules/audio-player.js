import playList from "./play-list";

const playPauseButton = document.querySelector('.play');
const playListContainer = document.querySelector('.play-list');
const audioPlayer = document.querySelector(".audio-player");

let isPlay = false;
const audio = new Audio();
let audioNumber = 0;
let prevAudioNumber = playList.length - 1;
audio.src = playList[audioNumber].src;
audio.currentTime = 0;

audio.addEventListener(
    "loadeddata",
    () => {
        audioPlayer.querySelector(".time-player .length").textContent = getTimeCodeFromNum(
            audio.duration
        );
        audio.volume = .75;
    },
    false
);

audio.onended = () => {
    playNext();
}

export function generatePlayList() {
    for (var a in playList) {
        const li = document.createElement('li');
        li.classList.add('play-item');
        if (a == 0) li.classList.add('item-active');
        li.textContent = playList[a].title;
        playListContainer.append(li);
    }
}

export function playPauseAudio() {
    if (!isPlay) {
        isPlay = true;
        playPauseButton.classList.add('pause');
        audio.play();
    } else {
        isPlay = false;
        playPauseButton.classList.remove('pause');
        audio.pause();
    }
}

export function playNext() {
    prevAudioNumber = audioNumber;
    if (audioNumber + 1 === playList.length) audioNumber = 0;
    else audioNumber++;
    changeTrack();
}

export function playPrev() {
    prevAudioNumber = audioNumber;
    if (audioNumber - 1 < 0) audioNumber = playList.length - 1;
    else audioNumber--;
    changeTrack();
}

function changeTrack() {
    audio.src = playList[audioNumber].src;
    audio.currentTime = 0;
    isPlay = false;
    playPauseAudio();
    const tracks = document.querySelectorAll('.play-item');
    tracks[audioNumber].classList.add('item-active');
    tracks[prevAudioNumber].classList.remove('item-active');
}

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}

//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}, false);

//click volume slider to change volume
const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
volumeSlider.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
}, false)

//check audio percentage and update time accordingly
setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress");
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    audioPlayer.querySelector(".time-player .current").textContent = getTimeCodeFromNum(
        audio.currentTime
    );
}, 500);

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
    const volumeEl = audioPlayer.querySelector(".volume-container .volume");
    audio.muted = !audio.muted;
    if (audio.muted) {
        volumeEl.classList.remove("icono-volumeMedium");
        volumeEl.classList.add("icono-volumeMute");
    } else {
        volumeEl.classList.add("icono-volumeMedium");
        volumeEl.classList.remove("icono-volumeMute");
    }
});