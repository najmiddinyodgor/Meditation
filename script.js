"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const app = () => {
    const timeSelect = document.querySelectorAll(".time-select__btn"),
      playBtn = document.querySelector(".player__toggle"),
      timeInfo = document.querySelector(".player__time"),
      video = document.querySelector(".video video"),
      song = document.querySelector(".player__song"),
      outline = document.querySelector(".player__outline--move circle"),
      songSelect = document.querySelectorAll(".sound-select__btn");

    const outlineLength = outline.getTotalLength();
    let duration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    playBtn.addEventListener("click", () => {
      if(song.paused) {
        playSong();
      } else {
        stopSong();
      }
    });

    song.ontimeupdate = function () {
      let elapsed = getElapsedTime(song);
      showTime(elapsed);
      drawProgress(song);

      let currentTime = song.currentTime;
      if (currentTime > duration) {
        stopSong();
        song.currentTime = 0;
      }
    };

    timeSelect.forEach((btn) => {
      btn.addEventListener("click", function () {
        duration = this.getAttribute("data-time");

        showTime(duration);
        stopSong();
        song.currentTime = 0;
      });
    });

    songSelect.forEach((btn) => {
      btn.addEventListener('click', function() {
        stopSong();
        song.src = this.getAttribute('data-song');
        video.src = this.getAttribute('data-video');
        song.currentTime = 0;
      })
    })

    function playSong() {
      song.play();
      video.play();
      playBtn.style.backgroundImage = "url('./svg/pause.svg')";
    }

    function stopSong() {
      song.pause();
      video.pause();
      playBtn.style.backgroundImage = "url('./svg/play.svg')";
    }

    function getElapsedTime(song) {
      let currentTime = song.currentTime,
        elapsed = duration - currentTime;

      return elapsed;
    }

    function showTime(time) {
      let seconds = Math.floor(time % 60),
        minutes = Math.floor(time / 60);

      if (seconds > 0 && seconds < 10) {
        timeInfo.textContent = `${minutes}:0${seconds}`;
      } else if (seconds == 0) {
        timeInfo.textContent = `${minutes}:${seconds}0`;
      } else {
        timeInfo.textContent = `${minutes}:${seconds}`;
      }
    }

    function drawProgress(song) {
      let currentTime = song.currentTime;

      let progress = outlineLength - (currentTime / duration) * outlineLength;
      outline.style.strokeDashoffset = progress;
    }
  };

  app();
});
