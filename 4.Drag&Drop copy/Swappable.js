// do something!

// https://githut.info
const LANGUAGES = ['JavaScript', 'Java', 'Python', 'CSS', 'PHP', 'Ruby', 'C++', 'C', 'Shell', 'C#'];

const Swappable = $container => {
  const shuffleLangages = languages => {
    const shuffledLanguages = [...languages];
    for (let i = 0; i < LANGUAGES.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledLanguages[i], shuffledLanguages[j]] = [shuffledLanguages[j], shuffledLanguages[i]];
    }
    return shuffledLanguages;
  };

  // prettier-ignore
  $container.innerHTML = `
    <ul class="draggable-list">
    ${shuffleLangages(LANGUAGES).map((language, idx) => `
      <li class=${LANGUAGES[idx] === language ? "right" : "wrong"}>
        <div class="seq">${idx + 1}</div>
        <div class="draggable" draggable="true">
          <p class="language-name">${language}</p>
          <i class="bx bx-menu"></i>
        </div>
      </li>`).join('')}
    </ul>`;

  const checkIsRight = $target => {
    const isRight = $target.firstElementChild.textContent === LANGUAGES[$target.previousElementSibling.textContent - 1];
    $target.closest('li').classList.toggle('right', isRight);
    $target.closest('li').classList.toggle('wrong', !isRight);
  };

  let $dragItem = null;

  const handleDragStart = e => {
    $dragItem = e.target;
  };

  const handleDragEnterAndLeave = e => {
    if (!e.target.closest('.draggable')) return;
    e.target.closest('li').classList.toggle('over');
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = e => {
    e.stopPropagation(); // stops the browser from redirecting.
    if (!e.target.closest('.draggable')) return;

    const $coveredItem = e.target.closest('.draggable');
    $coveredItem.closest('li').classList.remove('over');

    [$dragItem.innerHTML, $coveredItem.innerHTML] = [$coveredItem.innerHTML, $dragItem.innerHTML];

    checkIsRight($dragItem);
    checkIsRight($coveredItem);
  };

  $container.addEventListener('dragstart', handleDragStart);
  $container.addEventListener('dragenter', handleDragEnterAndLeave);
  $container.addEventListener('dragleave', handleDragEnterAndLeave);
  $container.addEventListener('dragover', handleDragOver);
  $container.addEventListener('drop', handleDrop);
};

export default Swappable;

// [회고]
// - 배열을 셔플하는 방법(피셔예이츠셔플) => 왜 더 나은 방법인지 찾아볼것
// - !e.target.closest('li')
// - window drag opacity
// - drag drop 이벤트를 다시 공부할 것
// - dragItem, dropItem 변수명 변경할 것
// - dragenter에서 over를 붙이는 경우 중첩된 요소에 들어갈때마다 leave가 동작하기 때문에
//   dragover에서 over를 붙여서 문제를 해결하였다. 그러나 이벤트가 너무 많이 발생하여 throttle걸어봤으나 버벅이는 현상이 발생하였다.
//   초를 줄여야하는데 그럴거면 안 쓰는 것이 더 좋다.
//   over에서는 무거운 행동을 하지 않으면 된다. 클래스를 붙이는 것은 가벼운 행동이다. - 강사님..
// - https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element
// - 버벅이는 현상은 leave때문에 발생하여 해결하기 곤란하고, over에서 여러번 호출하는 것이 싫다. enter와 leave에서 하겠다.
//   CSS에서 draggable자식의 pointer-events: none으로 설정하고 enter와 leave에 핸들러를 동일하게 등록한다.
// - draggable의 자식이 pointer-events에 영향을 받는 input 등의 요소라면 문제가 되겠지만, 그렇지 않은 경우에는 문제 해결 가능
// - dragover와 dragenter에서 e.preventDefault는 필요하고, drop에서 e.stopPropagation이 필요하다.