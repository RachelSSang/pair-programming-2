import { state, setState, Calendar } from './Calendar.js';

const DatePicker = $container => {
  $container.innerHTML = `
  <input class="date-picker" type="text" placeholder="Select date" readonly></input>
  <div class="calendar hidden"></div>`;

  const { width } = $container.dataset;

  const $calendarContainer = $container.querySelector('.calendar');
  Calendar($calendarContainer, width);

  $container.querySelector('.date-picker').addEventListener('click', () => {
    setState($calendarContainer, {
      render: { year: state.selected.year ?? state.today.year, month: state.selected.month ?? state.today.month },
    });
    $calendarContainer.classList.remove('hidden');
  });

  $container.querySelector('.calendar-grid').addEventListener('click', () => {
    $container.querySelector('.calendar').classList.add('hidden');
    $container.querySelector('.date-picker').value = Object.values(state.selected)
      .map((e, idx) => (idx !== 1 ? e + '' : e + 1 + '').padStart(2, '0'))
      .join('-');
  });

  document.body.addEventListener('click', e => {
    if (e.target.matches('.date-picker-container *')) return;
    $container.querySelector('.calendar').classList.add('hidden');
  });
};

export default DatePicker;
