const [year, month, date] = new Date()
  .toISOString()
  .slice(0, 10)
  .split('-')
  .map(e => +e);

let state = {
  today: { year, month, date },
  render: { year: null, month: null },
  selected: { year: null, month: null, date: null },
};

const render = $container => {
  // prettier-ignore
  const MONTH_LIST = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAY_LIST = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const { year, month } = state.render;

  console.log(state.render);

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
              year === state.today.year && month - 1 === state.today.month && date === state.today.date ? 'today' : ''
            } ${
              year === state.selected.year && month - 1 === state.selected.month && date === state.selected.date
                ? 'selected'
                : ''
            }">${date}</span>`
        )
        .join('')}
      ${dateList
        .map(
          (date, idx) =>
            `<span class="${idx % 7 === (7 - fisrtDay) % 7 ? 'red' : ''} ${
              year === state.today.year && month === state.today.month && date === state.today.date ? 'today' : ''
            } ${
              year === state.selected.year && month === state.selected.month && date === state.selected.date
                ? 'selected'
                : ''
            }">${date}</span>`
        )
        .join('')}
      ${nextDateList
        .map(
          date =>
            `<span class="gray next ${
              year === state.today.year && month + 1 === state.today.month && date === state.today.date ? 'today' : ''
            } ${
              year === state.selected.year && month + 1 === state.selected.month && date === state.selected.date
                ? 'selected'
                : ''
            }">${date}</span>`
        )
        .join('')}
    `;
};

const Calendar = $container => {
  const { width } = $container.dataset;

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

    $container.style.setProperty('--calendar-size', `${width}px`);
  })();

  // const renderDate = new Date();

  const setState = newState => {
    state = { ...state, ...newState };
    render($container);
  };

  setState({
    render: { year: state.selected.year ?? state.today.year, month: state.selected.month ?? state.today.month },
  });

  const renderDate = new Date(state.render.year, state.render.month, 1);

  $container.querySelector('.prev').addEventListener('click', () => {
    console.log(renderDate);
    renderDate.setMonth(state.render.month - 1);
    setState({
      render: { year: renderDate.getFullYear(), month: renderDate.getMonth() },
    });
  });
};

export default Calendar;
