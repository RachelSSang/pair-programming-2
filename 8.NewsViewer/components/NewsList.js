import getCategoryData from './apiFix.js';

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

  const getNewsListInnerHTML = (category, page) =>
    `${getCategoryData(category, { page })
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
      .join('')}`;

  let page;
  const render = (category, isFirst = true) => {
    // API 불러오기
    // console.log(getCategoryData(category));
    $container.querySelector('.news-list').innerHTML = isFirst ? '' : $container.querySelector('.news-list').innerHTML;

    if (isFirst) page = 1;
    else page += 1;

    console.log(isFirst, page);
    $container.querySelector('.news-list').innerHTML += getNewsListInnerHTML(category, page);
    // const getNews = async () => {};
    console.log('렌더링: ', category);
  };
  return render;
};

export default NewsList;
