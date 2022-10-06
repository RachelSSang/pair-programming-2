// do something!
import { Nav, NewsList } from './components/index.js';

const GLOBAL_STATE = { category: 'all' };

const observers = [];
const proxy = new Proxy(GLOBAL_STATE, {
  set: (obj, prop, value) => {
    obj[prop] = value;
    observers.forEach(observer => observer(obj[prop]));
    return true;
  },
});

const subscribe = func => {
  observers.push(func);
};

const $root = document.querySelector('#root');
Nav($root);
const renderNewsList = NewsList($root);
subscribe(renderNewsList);

window.addEventListener('load', () => {
  const intersectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          renderNewsList(proxy.category, false);
        }
      });
    },
    {
      rootMargin: '0px',
      threshold: 1,
    }
  );
  intersectionObserver.observe(document.querySelector('.scroll-observer'));
});

document.querySelector('nav').addEventListener('click', e => {
  if (!e.target.matches('.category-item')) return;
  [...document.querySelectorAll('.category-item')].forEach(category =>
    category.classList.toggle('active', category === e.target)
  );
  proxy.category = e.target.id;
});

// [회고]
// - Proxy를 굳이 써야 하는 이유...? 유효성 검사 , 포메팅, 알림, 디버깅 등의 작업을 하지 않음..
// - observable 클래스를 다른 파일로 뺄지말지~
// - 초기 category = null, 최초 렌더링 시 all로 바꿔주도록 변경할 것~?
// - intersection 의 옵션을 다시 공부할 것
// - entry.isIntersecting: true이면 아래로 스크롤 감지, false이면 위로 스크롤 감지
// intersectionCallback(entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       let elem = entry.target;

//       if (entry.intersectionRatio >= 0.75) {
//         intersectionCounter++;
//       }
//     }
//   });
// }
// - observer, proxy 전부 다시 공부할 것... 어떨결에 완성
