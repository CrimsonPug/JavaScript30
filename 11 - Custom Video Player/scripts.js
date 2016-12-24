//grabbing the elements

const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//making the function

function togglePlay() {
    const method = video.paused ? 'play': 'pause'; 
    video[method](); 
}

function updateVideo(){
    const icon = this.paused ? '►':'❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    // console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress(){
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(e){
    console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

//hooking up the function yo

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateVideo);
video.addEventListener('pause',updateVideo);
toggle.addEventListener('click',togglePlay);

skipButtons.forEach(buttons => {
    buttons.addEventListener('click',skip);
});
ranges.forEach(range =>{
    range.addEventListener('change',handleRangeUpdate);
});
ranges.forEach(range =>{
    range.addEventListener('mousemove',handleRangeUpdate);
});

video.addEventListener('timeupdate',handleProgress);

let mousedown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=> mousedown && scrub(e));
progress.addEventListener('mousedown',()=> mousedown = true);
progress.addEventListener('mouseup',()=> mousedown = false);
