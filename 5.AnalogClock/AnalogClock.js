const AnalogClock = $container => {
  // do something!
  // prettier-ignore
  $container.innerHTML = `
    <div class="hand hour"></div>
    <div class="hand minute"></div>
    <div class="hand second"></div>
    ${Array.from({ length: 12 }).map((_, idx) => `<div class="time time${idx + 1}">|</div>`).join('')}`;

  setInterval(
    (function displayTime() {
      const now = new Date();
      const [nowHour, nowMin, nowSec] = [now.getHours(), now.getMinutes(), now.getSeconds()];

      $container
        .querySelector('.hand.hour')
        .style.setProperty('--deg', nowHour * 30 + nowMin * (1 / 2) + nowSec * (1 / 120));
      $container.querySelector('.hand.minute').style.setProperty('--deg', nowMin * 6 + nowSec * (1 / 10));
      $container.querySelector('.hand.second').style.setProperty('--deg', nowSec * 6);

      return displayTime;
    })(),
    1000
  );
};

export default AnalogClock;

// [고민사항]
// - setInterval 지연 없이 시작하고 싶다.=> 즉시실행으로 한번실행
// - 즉시실행함수? 기명함수? 기명즉시실행함수? 다시 공부
// - 기명 즉시실행함수를 변수에 할당하는 것이 최선인가..?
// - 매번 Date객체 생성하는데 이게 좋을지 아니면 매초마다 각도만 바꾸는것이 좋을지 고민해볼것
// - 기명 즉시실행함수가 함수객체를 저장하는 변수명과 같아서 조금 복잡한 느낌이 들어 setInterval 첫번째 인자로 넣어주었다.
