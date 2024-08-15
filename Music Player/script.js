const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const albumArt = document.getElementById('album-art');

const songs = [
    {
        name: '02 cardigan',
        title: 'Cardigan',
        artist: 'Taylor Swift',
        albumArt: 'images/cover.jpg'
    },
    {
        name: '05 my tears ricochet',
        title: 'my tears ricochet',
        artist: 'Taylor Swift',
        albumArt: 'images/cover.jpg'
    },
];

let songIndex = 0;

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = `music/${song.name}.mp3`;

    const newAlbumArt = new Image();
    newAlbumArt.src = song.albumArt;

    newAlbumArt.onload = () => {
        albumArt.style.opacity = '0'; 

        setTimeout(() => {
            albumArt.src = newAlbumArt.src;
            albumArt.style.opacity = '1'; 
        }, 500);
    };
}

function playSong() {
    audio.play();
    playBtn.innerText = '⏸';  // Change to pause icon
    playBtn.classList.add('playing');
}

function pauseSong() {
    audio.pause();
    playBtn.innerText = '⏯';  // Change to play icon
    playBtn.classList.remove('playing');
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;

    const progressPercent = (audio.currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

playBtn.addEventListener('click', () => {
    const isPlaying = playBtn.classList.contains('playing');
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

loadSong(songs[songIndex]);
