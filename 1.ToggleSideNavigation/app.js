// do something!
const toggle_nav = (() => {
  let SIDE_NAV_OPENED = null;
  const TRANSITION_DURATION = 500;

  const $nav = document.querySelector('nav');

  window.addEventListener('DOMContentLoaded', () => {
    SIDE_NAV_OPENED = JSON.parse(localStorage.getItem('side-nav-opened') ?? false);
    $nav.classList.toggle('active', SIDE_NAV_OPENED);
    document.body.style.visibility = 'visible';
    setTimeout(() => document.body.classList.remove('preload'), TRANSITION_DURATION);
  });

  document.querySelector('.toggle').addEventListener('click', () => {
    SIDE_NAV_OPENED = !SIDE_NAV_OPENED;
    $nav.classList.toggle('active');
  });

  window.addEventListener('beforeunload', () =>
    localStorage.setItem('side-nav-opened', JSON.stringify(SIDE_NAV_OPENED))
  );
})();

// [회고]
// - DOM에 대한 의존성을 줄이기 위해 nav의 상태를 SIDE_NAV_OPENED에 저장
// - localstorage에 String(open/close)으로 저장할지 Boolean(true/false)으로 저장할지 고민했는데, toggle시 상태 관리의 편의성을 위해 Boolean값으로 저장함
// - localstorage에 효율적으로 값을 저장하고 읽어들이기 위해 DOMContentLoaded와 beforeunload 이벤트를 사용하였다.
