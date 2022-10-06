// import getCategoryData from './apiFix.js';

const API_KEY = '242746c99c754092b40a50804eae4e33';
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

  const getNewsListInnerHTML = newsList =>
    newsList
      .map(
        ({ title, description, url, urlToImage }) => `
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
          </section>`
      )
      .join('');

  const getNewsData = async (category, page, pageSize = PAGE_SIZE) => {
    const API_URL = `https://newsapi.org/v2/top-headlines?country=kr&category=${
      category === 'all' ? '' : category
    }&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

    try {
      // if(document.body.scrollHeight < window.innerHeight) getNewsData(category, page++, pageSize)
      return await axios.get(API_URL);
    } catch (err) {
      console.error(err);
    }
  };

  let page = 0;
  let totalPage;

  const render = async (category, isFirst = true) => {
    // API 불러오기
    $container.querySelector('.news-list').innerHTML = isFirst ? '' : $container.querySelector('.news-list').innerHTML;

    page = isFirst ? 1 : page + 1;

    const newsData = await getNewsData(category, page);
    const { articles, totalResults } = newsData.data;
    totalPage = Math.ceil(totalResults / PAGE_SIZE);
    $container.querySelector('.scroll-observer').style.display = `${page > totalPage ? 'none' : 'block'}`;
    const newsListInnerHTML = getNewsListInnerHTML(articles);
    $container.querySelector('.news-list').innerHTML += newsListInnerHTML;
    if (document.body.scrollHeight < window.innerHeight) render(category, false);
  };
  return render;
};

export default NewsList;
