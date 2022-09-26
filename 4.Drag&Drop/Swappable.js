// do something!

// https://githut.info
const languages = ['JavaScript', 'Java', 'Python', 'CSS', 'PHP', 'Ruby', 'C++', 'C', 'Shell', 'C#'];

const Swappable = $container => {
  // const shuffledLanguages = languages.sort(() => 0.5 - Math.random());
  const shuffledLanguages = [];
  for (let i = 0; i < languages.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    shuffledLanguages[i] = languages[j];
    shuffledLanguages[j] = languages[i];
  }

  // prettier-ignore
  $container.innerHTML = `
  <ul class="draggable-list">
  ${shuffledLanguages.map((language, idx) => `
    <li class=${languages[idx] === language ? "right" : "wrong"}>
      <div class="seq">${idx + 1}</div>
      <div class="draggable" draggable="true">
        <p class="language-name">${language}</p>
        <i class="bx bx-menu"></i>
      </div>
    </li>`).join('')}
  </ul>`;

  let $dragItem = null;

  const handleDragStart = e => {
    $dragItem = e.target;
    e.target.style.opacity = 1;
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDragEnter = e => {
    let $dropItem = e.target.closest('li');
    if (!$dropItem) return;
    $dropItem.classList.add('over');
  };

  const handleDragLeave = e => {
    let $dropItem = e.target.closest('li');
    if (!$dropItem) return;
    $dropItem.classList.remove('over');
  };

  const handleDrop = e => {
    e.stopPropagation(); // stops the browser from redirecting.
    let $dropItem = e.target.closest('.draggable');
    if (!$dropItem) return;
    $dropItem.closest('li').classList.remove('over');

    [$dragItem.innerHTML, $dropItem.innerHTML] = [$dropItem.innerHTML, $dragItem.innerHTML];

    const checkIsRight = $target => {
      const isRight =
        $target.firstElementChild.textContent === languages[$target.previousElementSibling.textContent - 1];
      $target.closest('li').classList.toggle('right', isRight);
      $target.closest('li').classList.toggle('wrong', !isRight);
    };

    // 순서 맞는지 검사
    checkIsRight($dragItem);
    checkIsRight($dropItem);
  };

  $container.addEventListener('dragstart', handleDragStart);
  $container.addEventListener('dragover', handleDragOver);
  $container.addEventListener('dragenter', handleDragEnter);
  $container.addEventListener('dragleave', handleDragLeave);
  //$container.addEventListener('dragend', handleDragEnd);
  $container.addEventListener('drop', handleDrop);
};

export default Swappable;

// [회고]
// - 배열을 셔플하는 방법(피셔예이츠셔플) => 왜 더 나은 방법인지 찾아볼것
// - !e.target.closest('li')
// - window drag opacity
// - drag drop 이벤트를 다시 공부할 것
// - dragItem, dropItem 변수명 변경할 것
