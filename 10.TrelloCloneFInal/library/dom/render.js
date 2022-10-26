import applyDiff from './applyDiff.js';
import eventHolder from './eventHolder.js';

// re-rendering 시 사용하기 위해 initial rendering 시 전달받은 root container와 root component의 인스턴스를 저장한다.
let $root = null; // root container
let rootComponentInstance = null; // root component's instance

/**
 * - eventHolder 배열에 저장되어 있는 event 객체를 기반으로 이벤트 핸들러를 일괄 등록한다.
 * - 단, 동일한 이벤트 핸들러는 중복 등록하지 않는다.
 * - 모든 이벤트 핸들러는 root container($root)에 위임 등록된다.
 * - 단, eventHolder 배열에 저장되어 있는 event 객체 중에서 selector 프로퍼티 값이 'window'인 경우 이벤트 핸들러는 window에 등록된다.
 * @type {($root: HTMLElement) => void}
 */
const bindEventHandler = $root => {
  for (const { type, selector, handler } of eventHolder) {
    /**
     * addEventListener는 동일한 이벤트 핸들러를 중복 등록하지 않는다.
     * 따라서 removeEventListener를 호출하지 않아도 이벤트 핸들러가 중복되지 않는다.
     * @see https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget-addEventListener
     * If multiple identical EventListeners are registered on the same EventTarget with the same parameters the duplicate instances are discarded.
     */
    (selector === 'window' ? window : $root).addEventListener(type, handler);
  }
};

/**
 * - domString을 반환하는 Component#render를 호출해 node 객체(virtualDOM)를 생성하고 기존 DOM과 비교해 차분을 DOM에 update 한다.
 *   그리고 이벤트 핸들러를 일괄 등록한다.
 * - initial rendering 또는 re-rendering 시 호출된다.
 * @type {(Component: {new(): String}, $container: HTMLElement) => void}
 *
 * TODO: React 18
 * @see https://reactjs.org/docs/react-dom-client.html#createroot
 * const root = createRoot(container);
 * root.render(element);
 */

const render = (RootComponent, $container) => {
  /**
   * render는 initial rendering/re-rendering 시 호출된다.
   * initial rendering 시에는 root component인 RootComponent와 root container인 $container가 전달되지만 re-rendering 시에는 전달되지 않는다.
   * re-rendering 시 사용하기 위해 initial rendering 시 전달받은 root component의 인스턴스와 root container를 저장한다.
   */
  if ($container) $root = $container;
  if (RootComponent) rootComponentInstance = new RootComponent();

  // 컨테이너 노드를 변경하지 않는다. 컨테이너 노드를 변경하면 컨테이너 노드에 위임 등록된 이벤트 핸들러가 모두 제거된다.
  const $virtual = $root.cloneNode();
  const domString = rootComponentInstance.render();
  $virtual.innerHTML = domString;

  // diffing & Reconciliation
  applyDiff($root, $virtual);
  /**
   * innerHTML이나 replaceWith를 사용해 기존 DOM tree를 새롭게 생성된 DOM tree와 교체하면 완전히 동일한 node까지
   * 다시 생성해 교체하기 때문에 performance에서 불리할 뿐 아니라 focus를 잃는 등 부작용도 발생한다.
   */
  // $root.innerHTML = domString;

  // 동일한 이벤트 핸들러는 중복 등록되지 않는다.
  bindEventHandler($root);
};

export default render;
