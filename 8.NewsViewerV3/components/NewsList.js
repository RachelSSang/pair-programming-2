import { proxy, subscribe } from './observer.js';

const API_KEY = '140a5e1bfff9486a83d7144c453de731';
const PAGE_SIZE = 5;

// do something!
const NewsList = $container => {
  (function initialRender() {
    const $newsListContainer = document.createElement('div');
    $newsListContainer.className = 'news-list-container';
    $newsListContainer.innerHTML = `
      <article class="news-list"></article>
      <div class="scroll-observer">
        <img src="img/ball-triangle.svg" alt="Loading..." />
      </div>
      `;
    $container.appendChild($newsListContainer);
  })();

  const getInnerHTML = newsList =>
    // prettier-ignore
    newsList.map(({ title, description, url, urlToImage }) => `
      <section class="news-item">
      <div class="thumbnail">
        <a href="${url}" target="_blank" rel="noopener noreferrer">
          <img src="${urlToImage}" alt="thumbnail" />
        </a>
      </div>
      <div class="contents">
        <h2>
          <a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>
        </h2>
        <p>${description}</p>
      </div>
      </section>`).join('');

  const getData = async (category, page, pageSize = PAGE_SIZE) => {
    // prettier-ignore
    const API_URL = `https://newsapi.org/v2/top-headlines?country=kr&category=${category === 'all' ? '' : category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

    try {
      const { data } = await axios.get(API_URL);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  let page = 0;

  // 카테고리 변경 시 비워주는 함수
  const clear = () => {
    page = 0;
    $container.querySelector('.news-list').innerHTML = '';
  };

  // intersectionObserver에 의해 호출되는 함수
  const render = async category => {
    page += 1;

    const { articles, totalResults } = await getData(category, page);

    const totalPage = Math.ceil(totalResults / PAGE_SIZE);
    $container.querySelector('.scroll-observer').style.display = `${page > totalPage ? 'none' : 'block'}`;

    $container.querySelector('.news-list').innerHTML += getInnerHTML(articles);

    if (document.body.scrollHeight < window.innerHeight) render(category);
  };

  window.addEventListener('load', () => {
    subscribe(clear);

    const intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) render(proxy.category);
        });
      },
      { rootMargin: '0px', threshold: 0.6 }
    );

    intersectionObserver.observe(document.querySelector('.scroll-observer'));
  });
};

export default NewsList;
