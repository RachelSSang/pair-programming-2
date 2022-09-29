import Calendar from './Calendar.js';

const DatePicker = $container => {
  // prettier-ignore

  $container.innerHTML = `
  <input class="date-picker" type="text" placeholder="Select date" readonly></input>
  <div class="calendar"></div>`;

  Calendar($container.querySelector('.calendar'));

  $container.querySelector('.date-picker').addEventListener('click', () => {});
};

export default DatePicker;

// 회고
// - date-picker-container 여러개일 때에도 정상 작동하도록
// - focus 동그라미
// - STATE 어떻게? render를 STATE에 포함?
// - 이 많은 조건들을 어떻게 함수화 할 것인가? 더 쉬운 방법은?
// - 매번 반복되는 복잡한 조건들을 span의 dataset에 저장하면 어떨가? -채린
// - css 짜잘한 것들 (중간 정렬) 해결할 것
