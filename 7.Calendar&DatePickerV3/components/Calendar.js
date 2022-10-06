const today = new Date();
const [year, month, date] = [today.getFullYear(), today.getMonth(), today.getDate()];

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

  const fisrtDay = +new Date(year, month, 1).getDay(); // 4
  const lastDay = +new Date(year, month + 1, 0).getDay(); // 5
  const prevLastDate = +new Date(year, month, 0).getDate(); // 31
  const currentLastDate = +new Date(year, month + 1, 0).getDate(); // 30

  const dateList = Array.from({ length: currentLastDate }, (_, idx) => idx + 1);
  const prevDateList = Array.from({ length: fisrtDay }, (_, idx) => prevLastDate - idx).reverse();
  const nextDateList = Array.from({ length: 6 - lastDay }, (_, idx) => idx + 1);

  const getClass = (date, markclass, direction = 0) => {
    const { year: classYear, month: classMonth, date: classDate } = state[markclass];
    return year === classYear && month + direction === classMonth && date === classDate ? `${markclass}` : '';
  };

  $container.querySelector('.current-month').textContent = MONTH_LIST[+month];
  $container.querySelector('.current-year').textContent = year;
  // prettier-ignore
  $container.querySelector('.calendar-grid').innerHTML = `
    ${DAY_LIST.map(day => `<span class="day gray">${day}</span>`).join('')}
    ${prevDateList.map(date =>`<span class="gray prev ${getClass(date, 'today', -1)} ${getClass(date, 'selected', -1)}">${date}</span>`).join('')}
    ${dateList.map((date, idx) =>`<span class="${idx % 7 === (7 - fisrtDay) % 7 ? 'red' : ''} ${getClass(date, 'today')} ${getClass(date,'selected')}">${date}</span>`).join('')}
    ${nextDateList.map(date =>`<span class="gray next ${getClass(date, 'today', +1)} ${getClass(date, 'selected', +1)}">${date}</span>`).join('')}
    `;
};

const setState = ($container, newState) => {
  state = { ...state, ...newState };
  render($container);
};

const Calendar = ($container, width) => {
  (() => {
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

  // 초기 rendering
  setState($container, {
    render: { year: state.selected.year ?? state.today.year, month: state.selected.month ?? state.today.month },
  });

  const renderDate = new Date(state.render.year, state.render.month, 1);

  $container.querySelector('.prev').addEventListener('click', () => {
    renderDate.setMonth(state.render.month - 1);
    setState($container, {
      render: { year: renderDate.getFullYear(), month: renderDate.getMonth() },
    });
  });

  $container.querySelector('.next').addEventListener('click', () => {
    renderDate.setMonth(state.render.month + 1);
    setState($container, {
      render: { year: renderDate.getFullYear(), month: renderDate.getMonth() },
    });
  });

  const selectedDate = new Date(state.render.year, state.render.month, 1);

  $container.querySelector('.calendar-grid').addEventListener('click', e => {
    if (e.target.matches('.day, .calendar-grid')) return;

    if (e.target.matches('.prev')) {
      selectedDate.setMonth(state.render.month - 1);
      setState($container, {
        selected: { year: selectedDate.getFullYear(), month: selectedDate.getMonth(), date: +e.target.textContent },
      });
    } else if (e.target.matches('.next')) {
      selectedDate.setMonth(state.render.month + 1);
      setState($container, {
        selected: { year: selectedDate.getFullYear(), month: selectedDate.getMonth(), date: +e.target.textContent },
      });
    } else
      setState($container, {
        selected: { ...state.render, date: +e.target.textContent },
      });
  });
};

export { state, setState, Calendar };
