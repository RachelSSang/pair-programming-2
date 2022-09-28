// do something!
const Nav = $container => {
  const CATEGORY_LIST = [
    { id: 'all', name: '전체보기' },
    { id: 'business', name: '비즈니스' },
    { id: 'entertainment', name: '엔터테인먼트' },
    { id: 'health', name: '건강' },
    { id: 'science', name: '과학' },
    { id: 'sports', name: '스포츠' },
    { id: 'technology', name: '기술' },
  ];

  (function initialRender() {
    const $nav = document.createElement('nav');
    $nav.className = 'category-list';
    $nav.innerHTML = `
      <ul>
        ${CATEGORY_LIST.map(
          ({ id, name }, idx) => `<li id="${id}" class="category-item ${idx === 0 ? 'active' : ''}">${name}</li>`
        ).join('')}
      </ul>`;
    $container.appendChild($nav);
  })();
};

export default Nav;
