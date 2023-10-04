'use strict';

const timerBlock = document.querySelector('.timer');

const setTimer = deadline => {
  // получить элементы со страницы

  const timerBlockDay = document.querySelector('.timer-day');
  const timerBlockHour = document.querySelector('.timer-hour');
  const timerBlockMin = document.querySelector('.timer-min');

  const timerTextDay = document.querySelector('.timer-day-txt');
  const timerTextHour = document.querySelector('.timer-hour-txt');
  const timerTextMin = document.querySelector('.timer-min-txt');

  const timerText = document.querySelector('.hero__promo-time-end');

  // меняет время окончания акции по времени
  const changeTimezone = (timezone, timeRemaining = 0) => {
    const date = new Date();
    const currentTimezone = date.getTimezoneOffset();
    const changeTimezone = timeRemaining +
    (currentTimezone * 60 * 1000) + (timezone * 60 * 60 * 1000);

    return changeTimezone;
  };

  // получить оставшееся время до дедлайна
  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    let timeRemaining = dateStop - dateNow;

    // меняет время окончания акции по времени +3 от гринвича
    timeRemaining = changeTimezone(+3, timeRemaining);

    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
    let hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    let minutes = Math.floor(timeRemaining / 1000 / 60 % 60);

    // склоняет дни, часы минуты
    const declensionNum = function(num, words) {
      const result = (num === 1 || (num > 20 && (num % 10 === 1))) ? words[0] :
      (num > 1 && num < 5) || ((num % 10 > 1) && (num % 10 < 5)) ? words[1] :
      words[2];
      return result;
    };

    // делает двузначным часы и минуты
    const formatTime = (h, min) => {
      if (min < 10) {
        min = `0${min}`;
      }
      if (h < 10) {
        h = `0${h}`;
      }
    };

    timerTextDay.dataset.title = declensionNum(
        days, ['день', 'дня', 'дней']);
    timerTextHour.dataset.title = declensionNum(
        hours, ['час', 'часа', 'часов']);
    timerTextMin.dataset.title = declensionNum(
        minutes, ['минута', 'минуты', 'минут']);

    // меняем на двузначное число часы и минуты
    formatTime(hours, minutes);

    return {timeRemaining, days, minutes, hours};
  };

  // меняет формат таймера (цвет)
  // const setStyleTimer = (days, hours) => {
  //   if (days === 0 && hours < 24) {
  //     timerBlock.style.backgroundColor = 'red';
  //     timerText.style.backgroundColor = 'red';
  //   } else {
  //     timerBlock.style.backgroundColor = 'green';
  //     timerText.style.backgroundColor = 'green';
  //   }
  // };

  /* Замена кода изменения цвета (оставил только красный) */
  const setStyleTimer = (days, hours) => {
    if (days === 0 && hours < 24) {
      timerBlock.style.backgroundColor = 'red';
      timerText.style.backgroundColor = 'red';
    }
  };


  const start = () => {
    const timer = getTimeRemaining();

    // вызов изменений стиля таймера
    setStyleTimer(timer.days, timer.hours);

    // вставить таймер в верстку
    timerBlockDay.textContent = timer.days;
    timerBlockHour.textContent = timer.hours;
    timerBlockMin.textContent = timer.minutes;

    // вставить склонение слов таймера в верстку
    timerTextDay.lastChild.textContent = ' ' + timerTextDay.dataset.title;
    timerTextHour.lastChild.textContent = ' ' + timerTextHour.dataset.title;
    timerTextMin.lastChild.textContent = ' ' + timerTextMin.dataset.title;

    // обновляет время
    const intervalId = setTimeout(start, 1000);

    // убирает таймер на 00:00:00
    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalId);
      timerBlock.innerHTML = '';
      timerText.innerHTML = '';
    }
  };

  start();
};
