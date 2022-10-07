// do something!
const toggleNav = ($nav, key) => {
  let isOpened = null;

  const getLocalState = () => JSON.parse(localStorage.getItem(key) ?? false);
  const setLocalState = () => localStorage.setItem(key, JSON.stringify(isOpened));

  window.addEventListener('DOMContentLoaded', () => {
    isOpened = getLocalState();
    $nav.classList.toggle('active', isOpened);
    document.body.style.visibility = 'visible';
  });

  window.addEventListener('load', () => document.body.classList.remove('preload'));

  document.querySelector('.toggle').addEventListener('click', () => {
    isOpened = !isOpened;
    $nav.classList.toggle('active');
  });

  window.addEventListener('beforeunload', setLocalState);
};

toggleNav(document.querySelector('nav'), 'side-nav-opened');

// [회고]
// - DOM에 대한 의존성을 줄이기 위해 nav의 상태를 isOpened에 저장
// - localstorage에 String(open/close)으로 저장할지 Boolean(true/false)으로 저장할지 고민했는데, toggle시 상태 관리의 편의성을 위해 Boolean값으로 저장함
// - localstorage에 효율적으로 값을 저장하고 읽어들이기 위해 DOMContentLoaded와 beforeunload 이벤트를 사용하였다.
// - localstorage는 domain을 기준으로 저장되므로 어플리케이션 전역에서 사용되어야 한다는 조건에 부합하다.
// - getLocalState, setLocalState 코드가 복잡하므로 함수로 분리하여 가독성을 높임
// - toggleNav에 nav요소와 key값을 인자로 받아 재사용성을 높임
