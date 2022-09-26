const menuList = [
  {
    title: 'HTML',
    subMenu: [
      { title: 'Semantic Web', path: '#' },
      { title: 'Hyperlink', path: '#' },
      { title: 'Form', path: '#' },
    ],
  },
  {
    title: 'CSS',
    subMenu: [
      { title: 'Selector', path: '#' },
      { title: 'Box model', path: '#' },
      { title: 'Layout', path: '#' },
    ],
  },
  {
    title: 'JavaScript',
    subMenu: [
      { title: 'Variable', path: '#' },
      { title: 'Function', path: '#' },
      { title: 'Object', path: '#' },
    ],
  },
];

/**
 * @type ($container: HTMLElement, option?: {showMultiple: boolean}) => void
 * showMultiple: 여러 메뉴를 동시에 오픈할지 여부(default: false)
 *
 * @example
 * Accordion(document.getElementById('accordion1'));
 * Accordion(document.getElementById('accordion2'), { showMultiple: true });
 */
const Accordion = ($container, option = { showMultiple: false }) => {
  // do something!

  document.body.classList.add('preload');

  // 동적으로 HTML 생성
  // prettier-ignore
  $container.innerHTML = `
  <div class="accordion-container">
    ${menuList.map(({ title, subMenu }, idx) => `
      <article class=${idx === 0 ? 'active' : ''}>
        <h1><i class="bx bxs-chevron-down"></i>${title}</h1>
        <ul>
          ${subMenu.map(({ title, path }) => `<li><a href="${path}">${title}</a></li>`).join('')}
        </ul>
      </article>`).join('')}
  </div>`;

  const $activeUl = $container.querySelector('.active ul');
  $activeUl.style.height = `${$activeUl.scrollHeight}px`;

  window.addEventListener('load', () => document.body.classList.remove('preload'));

  // prettier-ignore
  $container.addEventListener('click', e => {
    if (!e.target.closest('h1')) return;
    const $article = e.target.closest('article');

    if (option.showMultiple) {
      const $ul = e.target.nextElementSibling;
      const istoggle = e.target.closest("article").classList.toggle('active');
      $ul.style.height = `${istoggle? $ul.scrollHeight:0}px`;
    } else {
      [...$container.querySelectorAll('article')].forEach(article => {
        const $ul = article.querySelector('ul');
        if (article === $article) article.classList.toggle('active');
        else article.classList.remove('active');
        $ul.style.height = `${article.classList.contains('active') ? $ul.scrollHeight : 0}px`;
      });
    }
  });
};

export default Accordion;

// [고민사항]
// - preload 언제쓰누~~ㅋㅋㅋㅋ (초기 렌더링 시 잘 되는규ㅠㅠ)
// => 호고곡... offsetHeight, scrollHeight가 리플로우를 발생시켜서 불필요하게 preload 처리를 해야했던 것이다.
//    우리가 쓴 방식은 리플로우를 발생시키지 않아서 초기 렌더링을 잘하는 것... 그러나 44px을 유연하게 바꿔줘야 할 것이다.
// => 그러나 height를 변경하는 것도 리플로우를 발생시키는데... 이상하기때문에 preload 처리를 해준다.
//    그리고 44px이 유연성이 없기 때문에 scrollHeight를 결국에 사용한다.
// - 높이 계산이랑 토글 잘 하면 묶을 수 있을지도...
// - showMultiple if문 말고 합칠수 있는 방법 있을지도...
// - toggle메서드의 반환값이 true/false인것을 이용함
