'use script';

// дизейбл кнопки отправки формы
const submitHandler = e => {
  e.preventDefault();
}
document.querySelector('.join__submit').addEventListener('click', submitHandler);
document.querySelector('.join__submit').addEventListener('touchend', submitHandler);

// обьявление констант
const play = document.querySelector('.player__play-btn');
const next = document.querySelector('.player__next-btn');
const prev = document.querySelector('.player__prev-btn');
const loop = document.querySelector('.player__loop-btn');
const volume = document.querySelector('.player__volume-btn');
const volumeContainer = document.querySelector('.volume');
const volumeBar = document.querySelector('.volume__bar');
const nameOfSong = document.querySelector('.player__name');
const durationOfSong = document.querySelector('.player__duration');
const trackBar = document.querySelector('.player__track-bar');

// класс плеера
class AudioObj {
  constructor(htmlClass) {
    // сам плеер
    this.audio = document.querySelector(htmlClass);

    // флаг открыт ли попап с регулировщиком громкости
    this.volumeShoved = false;

    // выставление названия и продолжительности трека
    this.audio.addEventListener('loadedmetadata', this.setDescriptionOfSong.bind(this));

    // листенеры на кнопках плеера 
    play.addEventListener('click', this.playAudio.bind(this));
    loop.addEventListener('click', this.loopAudio.bind(this));
    volume.addEventListener('click', this.volumeToggle.bind(this));
    volumeBar.addEventListener('change', this.changeVolume.bind(this));
    trackBar.addEventListener('change', this.changePositionOnTrack.bind(this));
    this.audio.addEventListener('timeupdate', this.changePositionOnTrackAuto.bind(this));
  }

  // обработчик кнопки play
  playAudio() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
    play.classList.toggle('player__play-btn--pause');
  }

  // обработчик кнопки repeat
  loopAudio() {
    if (this.audio.loop) {
      this.audio.loop = false;
    } else {
      this.audio.loop = true;
    }
    loop.classList.toggle('player__loop-btn--on');
  }

  // обработчик проверки закрывать ли попап регулировщика громкости
  // закрывается по клику вне попапа
  closeVolumeContainer(e) {
    if (volumeContainer !== e.target && volume !== e.target && e.target.type !== 'range') {
      this.volumeToggle();
    }
  }

  // обработчик кнопки показать/скрыть регулировщик громкости
  volumeToggle() {
    if (!this.volumeShoved) {
      volumeContainer.classList.add('volume--show');
      volume.classList.add('.player__volume-btn--on');
      document.addEventListener('click', this.closeVolumeContainer.bind(this));
    } else {
      volumeContainer.classList.remove('volume--show');
      volume.classList.remove('.player__volume-btn--on');
      document.removeEventListener('click', this.closeVolumeContainer.bind(this));
    }
    this.volumeShoved = !this.volumeShoved;
  }

  // обработчик резулировщика громкости
  changeVolume() {
    this.audio.volume = volumeBar.value / 100;
  }

  // получение имени трека
  getName() {
    const src = this.audio.currentSrc;
    const start = src.lastIndexOf('/') + 1;
    const end = src.lastIndexOf('.');
    return src.slice(start, end).replace(/%20/g, ' ');
  }

  // получение и форматирование продолжительности трека
  getDuration() {
    const rawSeconds = this.audio.duration;
    const mins = Math.floor(rawSeconds / 60);
    const sec = Math.round(rawSeconds % 60, 2);
    return `${mins}.${sec}`
  }

  // обработчик перехода по треку
  changePositionOnTrack() {
    this.audio.currentTime = trackBar.value;
  }

  // обработчик перемещения ползунка по треку при его проигрывании
  changePositionOnTrackAuto() {
    trackBar.value = this.audio.currentTime;
  }

  // выставление имени и продолжительности трека на странице
  setDescriptionOfSong() {
    nameOfSong.innerHTML = this.getName();
    durationOfSong.innerHTML = this.getDuration();
    trackBar.max = this.audio.duration;
  }
}

const player = new AudioObj('.player__audio');
