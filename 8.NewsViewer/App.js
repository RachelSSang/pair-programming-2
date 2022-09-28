// do something!
import { Nav, NewsList } from './components/index.js';

const GLOBAL_STATE = { category: 'all' };

class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter(observer => observer !== func);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

const observable = new Observable();

const globalStateProxy = new Proxy(GLOBAL_STATE, {
  get: (obj, prop) => obj[prop],
  set: (obj, prop, value) => {
    obj[prop] = value;
    observable.notify(obj[prop]);
    return true;
  },
});

const $root = document.querySelector('#root');
Nav($root);
const newsList = NewsList($root);
observable.subscribe(newsList);

window.addEventListener('DOMContentLoaded', () => newsList(globalStateProxy.category));

// 이벤트 리스너
document.querySelector('nav').addEventListener('click', e => {
  if (!e.target.matches('.category-item')) return;
  [...document.querySelectorAll('.category-item')].forEach(category =>
    category.classList.toggle('active', category === e.target)
  );
  console.log('!!!!', e.target.id);
  globalStateProxy.category = e.target.id;
});

const intersectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('스크롤:', globalStateProxy.category);
        newsList(globalStateProxy.category, false);
      }
    });
  },
  {
    rootMargin: '0px',
    threshold: 1.0,
  }
);

intersectionObserver.observe(document.querySelector('.scroll-observer'));

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
