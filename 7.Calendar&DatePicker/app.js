import DatePicker from './calendar/index.js';

const $containers = [...document.querySelectorAll('.date-picker-container')];

$containers.forEach(($container, i) => {
  DatePicker($container);

  // $container.addEventListener('rating-change', e => {
  //   const rating = e.detail;
  //   $currentRatings[i].textContent = rating;
  // });
});
