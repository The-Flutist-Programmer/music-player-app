const songs = [
  {
    title: 'Lofi Music',
    artist: 'LoFi Vibes',
    src: './songs/lofi-music-1.mp3',
    cover: './covers/lofi-cover.png',
  },
  {
    title: 'PCH',
    artist: 'Patrick Patrikios',
    src: './songs/PCH-music-2.mp3',
    cover: './covers/pch-cover.png',
  },
  {
    title: 'Touch',
    artist: 'Anno Domini Beats',
    src: './songs/Touch-music-3.mp3',
    cover: './covers/funky-cover.png',
  },
];

let songIndex = 0;
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const audio = new Audio();

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.textContent = '⏸️';
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = '▶️';
}

playBtn.addEventListener('click', () => {
  if (audio.paused) playSong();
  else pauseSong();
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar and time
audio.addEventListener('timeupdate', updateProgress);

function updateProgress() {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
  updateTimes();
}

function updateTimes() {
  const current = formatTime(audio.currentTime);
  const duration = formatTime(audio.duration);
  currentTimeEl.textContent = current;
  durationEl.textContent = duration;
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

// Seek functionality
progressContainer.addEventListener('click', setProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// When song ends, play next
audio.addEventListener('ended', nextSong);

const volumeSlider = document.getElementById('volume');

// Set initial volume
audio.volume = volumeSlider.value;

// Update audio volume when user moves the slider
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

loadSong(songs[songIndex]);
