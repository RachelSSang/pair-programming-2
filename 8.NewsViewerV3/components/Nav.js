// do something!
import { proxy } from './observer.js';

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

  $container.innerHTML = `
    <nav class="category-list">
      <ul>
        ${CATEGORY_LIST.map(
          ({ id, name }, idx) => `<li id="${id}" class="category-item ${idx === 0 ? 'active' : ''}">${name}</li>`
        ).join('')}
      </ul>
    </nav>`;

  $container.querySelector('nav').addEventListener('click', e => {
    if (!e.target.matches('.category-item')) return;
    [...$container.querySelectorAll('.category-item')].forEach(category =>
      category.classList.toggle('active', category === e.target)
    );
    proxy.category = e.target.id;
  });
};

export default Nav;
