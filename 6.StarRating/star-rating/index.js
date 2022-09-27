// do something!
[...document.querySelectorAll('link')]
  .at(-1)
  .insertAdjacentHTML('afterend', '<link href="star-rating/theme.css" rel="stylesheet" />');

const StarRating = $container => {
  const $starRatingContainer = document.createElement('div');
  $starRatingContainer.className = 'star-rating-container';
  for (let i = 0; i < $container.dataset.maxRating; i++) {
    $starRatingContainer.innerHTML += `<i class="bx bxs-star" data-idx=${i}></i>`;
  }
  $container.appendChild($starRatingContainer);

  $container.addEventListener('mouseover', e => {
    if (!e.target.matches('i')) return;
    [...$container.querySelectorAll('i')].forEach(($star, idx) =>
      $star.classList.toggle('hovered', idx <= e.target.dataset.idx)
    );
  });

  $container.addEventListener('mouseout', e => {
    if (!e.target.closest('.star-rating-container')) return;
    [...$container.querySelectorAll('i')].forEach($star => $star.classList.remove('hovered'));
  });

  $container.addEventListener('click', e => {
    const staridx = e.target.dataset.idx;
    if (!e.target.matches('i')) return;
    [...$container.querySelectorAll('i')].forEach(($star, idx) => $star.classList.toggle('selected', idx <= staridx));

    const ratingChange = new CustomEvent('rating-change', { detail: +staridx + 1 });
    $container.dispatchEvent(ratingChange);
  });
};

export default StarRating;

// [고민]
// - mouseover/out: 버블링 되는 이벤트 vs mouseenter/mouseleave: 버블링 안되는 이벤트 -> 책 참고
// - custom event에 대해 공부해보자
// - 별을 클릭했을 때 별점을 편리하게 알아내고자 dataset 어트리뷰트를 사용하였다.
