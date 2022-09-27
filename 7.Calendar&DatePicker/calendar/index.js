[...document.querySelectorAll('link')]
  .at(-1)
  .insertAdjacentHTML('afterend', '<link href="calendar/theme.css" rel="stylesheet" />');

const DatePicker = $container => {
  // prettier-ignore
  const [year, month, date] = new Date().toISOString().slice(0, 10).split('-').map(e => +e);

  const STATE = {
    today: { year, month, date },
    render: { year: null, month: null },
    selected: { year: null, month: null, date: null },
  };

  const { width } = $container.dataset;

  (function initialRender() {
    $container.innerHTML = `
      <input class="date-picker" type="text" placeholder="Select date" readonly></input>
      <div class="calendar hidden">
        <div class="calendar-nav">
          <i class='bx bx-caret-left bx-sm prev'></i>
          <div class="current-month-year">
            <span class="current-month"></span>
            <span class="current-year"></span>
          </div>
          <i class='bx bx-caret-right bx-sm next'></i>
        </div>
        <div class="calendar-grid"></div>
      </div>`;

    $container.querySelector('.calendar').style.setProperty('--calendar-size', `${width}px`);
  })();

  // prettier-ignore
  const MONTH_LIST = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];
  const DAY_LIST = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const render = () => {
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
              year === STATE.selected.year && month - 1 === STATE.selected.month && date === STATE.selected.date
                ? 'selected'
                : ''
            }">${date}</span>`
        )
        .join('')}
      ${dateList
        .map(
          (date, idx) =>
            `<span class="${idx % 7 === (7 - fisrtDay) % 7 ? 'red' : ''} ${
              year === STATE.today.year && month === STATE.today.month && date === STATE.today.date ? 'today' : ''
            } ${
              year === STATE.selected.year && month === STATE.selected.month && date === STATE.selected.date
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
              year === STATE.selected.year && month + 1 === STATE.selected.month && date === STATE.selected.date
                ? 'selected'
                : ''
            }">${date}</span>`
        )
        .join('')}
    `;
  };

  $container.querySelector('.date-picker').addEventListener('click', () => {
    STATE.render.year = STATE.selected.year ?? STATE.today.year;
    STATE.render.month = STATE.selected.month ?? STATE.today.month;
    render();
    $container.querySelector('.calendar').classList.remove('hidden');
  });

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

  $container.querySelector('.calendar-grid').addEventListener('click', e => {
    if (e.target.matches('.day, .calendar-grid')) return;
    if (e.target.matches('.prev'))
      STATE.selected = {
        year: STATE.render.month === 1 ? STATE.render.year - 1 : STATE.render.year,
        month: STATE.render.month === 1 ? 12 : STATE.render.month - 1,
        date: +e.target.textContent,
      };
    else if (e.target.matches('.next'))
      STATE.selected = {
        year: STATE.render.month === 12 ? STATE.render.year + 1 : STATE.render.year,
        month: STATE.render.month === 12 ? 1 : STATE.render.month + 1,
        date: +e.target.textContent,
      };
    else STATE.selected = { ...STATE.render, date: +e.target.textContent };
    $container.querySelector('.calendar').classList.add('hidden');
    $container.querySelector('.date-picker').value = Object.values(STATE.selected)
      .map(e => (e + '').padStart(2, '0'))
      .join('-');
  });

  document.body.addEventListener('click', e => {
    if (e.target.matches('.date-picker-container *')) return;
    $container.querySelector('.calendar').classList.add('hidden');
  });
};

export default DatePicker;

// 회고
// - date-picker-container 여러개일 때에도 정상 작동하도록
// - focus 동그라미
// - STATE 어떻게? render를 STATE에 포함?
// - 이 많은 조건들을 어떻게 함수화 할 것인가? 더 쉬운 방법은?
// - 매번 반복되는 복잡한 조건들을 span의 dataset에 저장하면 어떨가? -채린
// - css 짜잘한 것들 (중간 정렬) 해결할 것
