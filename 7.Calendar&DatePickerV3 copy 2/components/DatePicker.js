import Calendar from './Calendar.js';

const DatePicker = $container => {
  $container.innerHTML = `
  <input class="date-picker" type="text" placeholder="Select date" readonly></input>
  <div class="calendar hidden"></div>`;

  const { width } = $container.dataset;

  const $calendarContainer = $container.querySelector('.calendar');

  $container.querySelector('.date-picker').addEventListener('click', () => {
    Calendar($calendarContainer, width);
    $calendarContainer.classList.remove('hidden');
  });

  $container.addEventListener('date-select', e => {
    $container.querySelector('.calendar').classList.add('hidden');
    console.log(e.detail);
    $container.querySelector('.date-picker').value = e.detail;
  });

  document.body.addEventListener('click', e => {
    if (e.target.matches('.date-picker-container *')) return;
    $container.querySelector('.calendar').classList.add('hidden');
  });
};

export default DatePicker;
