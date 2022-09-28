const [year, month, date] = new Date()
  .toISOString()
  .slice(0, 10)
  .split('-')
  .map(e => +e);

const STATE = {
  today: { year, month, date },
  render: { year: null, month: null },
  //    selected: { year: null, month: null, date: null },
};

const Calendar = $container => {
  // prettier-ignore
  const MONTH_LIST = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAY_LIST = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // prettier-ignore

  (function initialRender() {
    $container.innerHTML = `
      <div class="calendar-nav">
        <i class='bx bx-caret-left bx-sm prev'></i>
        <div class="current-month-year">
          <span class="current-month"></span>
          <span class="current-year"></span>
        </div>
        <i class='bx bx-caret-right bx-sm next'></i>
      </div>
      <div class="calendar-grid"></div>`;

    $container.style.setProperty('--calendar-size', `${$container.dataset.width}px`);
  })();

  // prettier-ignore
  const render = (selectedyear, selectedmonth, selecteddate) => {
    const { year, month } = STATE.render;
    
    const fisrtDay = +new Date(year, month - 1, 1).getDay(); // 4
    const lastDay = +new Date(year, month, 0).getDay(); // 5
    const prevLastDate = +new Date(year, month - 1, 0).getDate(); // 31
    const currentLastDate = +new Date(year, month, 0).getDate(); // 30

    const dateList = Array.from({ length: currentLastDate }, (_, idx) => idx + 1);
    const prevDateList = Array.from({ length: fisrtDay }, (_, idx) => prevLastDate - (fisrtDay - idx - 1));
    const nextDateList = Array.from({ length: 6 - lastDay }, (_, idx) => idx + 1);

    $container.querySelector('.current-month').textContent = MONTH_LIST[+month - 1];
    $container.querySelector('.current-year').textContent = year;
    $container.querySelector('.calendar-grid').innerHTML = `
      ${DAY_LIST.map(day => `<span class="day gray">${day}</span>`).join('')}
      ${prevDateList
        .map(
          date =>
            `<span class="gray prev ${
              year === STATE.today.year && month - 1 === STATE.today.month && date === STATE.today.date ? 'today' : ''
            } ${
              year === selectedyear && month - 1 === selectedmonth && date === selectedmonth? 'selected': ''
            }">${date}</span>`
        )
        .join('')}
      ${dateList
        .map(
          (date, idx) =>
            `<span class="${idx % 7 === (7 - fisrtDay) % 7 ? 'red' : ''} ${
              year === STATE.today.year && month === STATE.today.month && date === STATE.today.date ? 'today' : ''
            } ${
              year === selectedyear && month === selectedmonth && date === selectedmonth
                ? 'selected'
                : ''
            }">${date}</span>`
        )
        .join('')}
      ${nextDateList
        .map(
          date =>
            `<span class="gray next ${
              year === STATE.today.year && month + 1 === STATE.today.month && date === STATE.today.date ? 'today' : ''
            } ${
              year === selectedyear && month + 1 === selectedmonth && date === selectedmonth
                ? 'selected'
                : ''
            }">${date}</span>`
        )
        .join('')}
    `;
  };

  render();

  $container.querySelector('.prev').addEventListener('click', () => {
    STATE.render.month = STATE.render.month === 1 ? 12 : STATE.render.month - 1;
    STATE.render.year -= STATE.render.month === 12 ? 1 : 0;
    render();
  });

  $container.querySelector('.next').addEventListener('click', () => {
    STATE.render.month = STATE.render.month === 12 ? 1 : STATE.render.month + 1;
    STATE.render.year += STATE.render.month === 1 ? 1 : 0;
    render();
  });
};

export default Calendar;
