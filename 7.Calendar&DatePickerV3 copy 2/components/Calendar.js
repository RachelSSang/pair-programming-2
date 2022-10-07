// const state = {
//   // today: { year, month, date },
//   // render: { year: null, month: null },
//   selected: { year: null, month: null, date: null },
// };

// const setState = ($container, newState) => {
//   state = { ...state, ...newState };
//   render($container);
// };

const dates = { today: new Date(), selected: null, current: null };

const Calendar = ($container, width) => {
  const render = renderDate => {
    // prettier-ignore
    const MONTH_LIST = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const DAY_LIST = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    dates.current = renderDate;
    const [currentYear, currentMonth] = [dates.current.getFullYear(), dates.current.getMonth()];
    const fisrtDay = +new Date(currentYear, currentMonth, 1).getDay();
    const lastDay = +new Date(currentYear, currentMonth + 1, 0).getDay();
    const prevLastDate = +new Date(currentYear, currentMonth, 0).getDate();
    const currentLastDate = +new Date(currentYear, currentMonth + 1, 0).getDate();

    const dateList = Array.from({ length: currentLastDate }, (_, idx) => idx + 1);
    const prevDateList = Array.from({ length: fisrtDay }, (_, idx) => prevLastDate - idx).reverse();
    const nextDateList = Array.from({ length: 6 - lastDay }, (_, idx) => idx + 1);

    const getSelectedClass = (selectedDate, direction = 0) => {
      const [classYear, classMonth, classDate] = [
        dates.selected.getFullYear(),
        dates.selected.getMonth(),
        dates.selected.getDate(),
      ];
      return currentYear === classYear && currentMonth + direction === classMonth && date === classDate
        ? `selected`
        : '';
    };

    const getTodayClass = (date, direction = 0) => {
      const [classYear, classMonth, classDate] = [todayYear, todayMonth, todayDate];
      return currentYear === classYear && currentMonth + direction === classMonth && date === classDate ? `today` : '';
    };

    $container.querySelector('.current-month').textContent = MONTH_LIST[+currentMonth];
    $container.querySelector('.current-year').textContent = currentYear;

    // prettier-ignore
    $container.querySelector('.calendar-grid').innerHTML = `
      ${DAY_LIST.map(day => `<span class="day gray">${day}</span>`).join('')}
      ${prevDateList.map(date =>`<span class="gray prev ${getTodayClass(date, -1)} ${getSelectedClass(date, -1)}">${date}</span>`).join('')}
      ${dateList.map((date, idx) =>`<span class="${idx % 7 === (7 - fisrtDay) % 7 ? 'red' : ''} ${getTodayClass(date)} ${getSelectedClass(date)}">${date}</span>`).join('')}
      ${nextDateList.map(date =>`<span class="gray next ${getTodayClass(date, +1)} ${getSelectedClass(date, +1)}">${date}</span>`).join('')}
      `;
  };

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

    render(selectedYear ? new Date(selectedYear, selectedMonth, 1) : today);
  })();

  const renderDateObj = new Date(currentYear, currentMonth, 1);

  $container.querySelector('.prev').addEventListener('click', () => {
    renderDateObj.setMonth(currentMonth - 1);
    [currentYear, currentMonth] = [renderDateObj.getFullYear(), renderDateObj.getMonth()];
    render(renderDateObj);
  });

  $container.querySelector('.next').addEventListener('click', () => {
    renderDateObj.setMonth(currentMonth + 1);
    [currentYear, currentMonth] = [renderDateObj.getFullYear(), renderDateObj.getMonth()];
    render(renderDateObj);
  });

  $container.querySelector('.calendar-grid').addEventListener('click', e => {
    const selectedDateObj = new Date(renderYear, currentMonth, 1);

    if (e.target.matches('.day, .calendar-grid')) return;

    if (e.target.matches('.prev')) selectedDateObj.setMonth(currentMonth - 1);
    else if (e.target.matches('.next')) selectedDateObj.setMonth(currentMonth + 1);
    [selectedYear, selectedMonth, selectedDate] = [
      selectedDateObj.getFullYear(),
      selectedDateObj.getMonth(),
      +e.target.textContent,
    ];
    render(selectedDateObj);

    // selected된 값을 detail에 넣고 커스텀이벤트 발생시켜서 datepicker에서 리렌더링하도록
    const selectedDateString = [selectedYear, selectedMonth, selectedDate]
      .map((e, idx) => (idx !== 1 ? e + '' : e + 1 + '').padStart(2, '0'))
      .join('-');
    const dateSelect = new CustomEvent('date-select', { detail: selectedDateString, bubbles: true });
    $container.dispatchEvent(dateSelect);
  });
};

export default Calendar;
