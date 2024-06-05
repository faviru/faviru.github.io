let cover = document.getElementsByClassName('cover');
let racoon = document.getElementsByClassName('racoon-picture');
let play = document.getElementsByClassName('racoon-music');
let musicPlaying = false;

play[0].volume = 0.2;

function animToggle(el, state) {
  if (state) {
    el.style.animationPlayState = "running";
  } else {
    el.style.animationPlayState = "paused";
  }
}

function playMusic() {
  if (!musicPlaying) {
    animToggle(racoon[0], 1)
    play[0].volume = 0.3;
    cover[0].classList.add("hide")
    play[0].play()
  } else {
    animToggle(racoon[0], 0)
    play[0].pause()
  }
  musicPlaying = !musicPlaying;
}; 