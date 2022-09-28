// do something!
[...document.querySelectorAll('link')]
  .at(-1)
  .insertAdjacentHTML('afterend', '<link href="star-rating/theme.css" rel="stylesheet" />');

const StarRating = $container => {
  $container.innerHTML = `
  <div class="star-rating-container">
    ${Array.from({ length: $container.dataset.maxRating })
      .map((_, idx) => `<i class="bx bxs-star" data-idx=${idx}></i>`)
      .join('')}
  </div>`;

  const $stars = [...$container.querySelectorAll('i')];

  $container.addEventListener('mouseover', e => {
    if (!e.target.matches('i')) return;
    $stars.forEach(($star, idx) => $star.classList.toggle('hovered', idx <= +e.target.dataset.idx));
  });

  $container.addEventListener('mouseout', e => {
    if (!e.target.closest('.star-rating-container')) return;
    $stars.forEach($star => $star.classList.remove('hovered'));
  });

  $container.addEventListener('click', e => {
    if (!e.target.matches('i')) return;

    const clickedStarIdx = +e.target.dataset.idx;
    $stars.forEach(($star, idx) => $star.classList.toggle('selected', idx <= clickedStarIdx));

    const ratingChange = new CustomEvent('rating-change', { detail: clickedStarIdx + 1 });
    $container.dispatchEvent(ratingChange);
  });
};

export default StarRating;

// [고민]
// - mouseover/out: 버블링 되는 이벤트 vs mouseenter/mouseleave: 버블링 안되는 이벤트 -> 책 참고
// - custom event에 대해 공부해보자
// - 별을 클릭했을 때 별점을 편리하게 알아내고자 dataset 어트리뷰트를 사용하였다.
// - for문을 쓰기 위해 html을 appendChild로 붙여주었으나, Array를 생성하여 map으로 대체함으로써 innerHTML을 사용할 수 있게 되었다.
// - mouseover, mouseout, click 이벤트가 발생할 때마다 DOM에서 가져오던 별들을 미리 stars 변수에 넣어주었다.
