//videoents
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggleButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip');
const ranges = player.querySelectorAll('.player__slider');
const openFullScreenButton = player.querySelector('.fullScreen');

//Functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggleButton.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    //data props = video props
    video[this.name] = this.value;
    //console.log(`updated ${this.name}: ${this.value}`);
}

function scrub(event) {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function openFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { /* Firefox */
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE/Edge */
        video.msRequestFullscreen();
    }
}

//Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggleButton.addEventListener('click', togglePlay);
openFullScreenButton.addEventListener('click', openFullscreen);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event)); //shorthand if-statement