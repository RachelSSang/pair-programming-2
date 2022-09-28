import Calendar from './Calendar.js';

const DatePicker = $container => {
  // prettier-ignore

  $container.innerHTML = `
  <input class="date-picker" type="text" placeholder="Select date" readonly></input>
  <div class="calendar"></div>`
  ;

  Calendar($container.querySelector('.calendar'));
  /*

  $container.querySelector('.date-picker').addEventListener('click', () => {
    STATE.render.year = STATE.selected.year ?? STATE.today.year;
    STATE.render.month = STATE.selected.month ?? STATE.today.month;
    render();
    $container.querySelector('.calendar').classList.remove('hidden');
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
  */
};

export default DatePicker;

// 회고
// - date-picker-container 여러개일 때에도 정상 작동하도록
// - focus 동그라미
// - STATE 어떻게? render를 STATE에 포함?
// - 이 많은 조건들을 어떻게 함수화 할 것인가? 더 쉬운 방법은?
// - 매번 반복되는 복잡한 조건들을 span의 dataset에 저장하면 어떨가? -채린
// - css 짜잘한 것들 (중간 정렬) 해결할 것
