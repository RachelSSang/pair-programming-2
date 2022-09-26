const AnalogClock = $container => {
  // do something!
  $container.innerHTML = `
    <div class="hand hour"></div>
    <div class="hand minute"></div>
    <div class="hand second"></div>
    <div class="time time1">|</div>
    <div class="time time2">|</div>
    <div class="time time3">|</div>
    <div class="time time4">|</div>
    <div class="time time5">|</div>
    <div class="time time6">|</div>
    <div class="time time7">|</div>
    <div class="time time8">|</div>
    <div class="time time9">|</div>
    <div class="time time10">|</div>
    <div class="time time11">|</div>
    <div class="time time12">|</div>
  `;

  const displayTime = (function displayTime() {
    const now = new Date();
    const [nowHour, nowMin, nowSec] = [now.getHours(), now.getMinutes(), now.getSeconds()];
    $container
      .querySelector('.hand.hour')
      .style.setProperty('--deg', nowHour * 30 + nowMin * (1 / 2) + nowSec * (1 / 120));
    $container.querySelector('.hand.minute').style.setProperty('--deg', nowMin * 6 + nowSec * (1 / 10));
    $container.querySelector('.hand.second').style.setProperty('--deg', nowSec * 6);
    return displayTime;
  })();

  setInterval(displayTime, 1000);
};

export default AnalogClock;

// [고민사항]
// - setInterval 지연 없이 시작
// - 기명 즉시실행함수? 기명함수? 즉시실행함수? 다시 공부
// - 매번 Date객체 생성하는데 이게 좋을지 아니면 매초마다 각도만 바꾸는것이 좋을지 고민해볼것
