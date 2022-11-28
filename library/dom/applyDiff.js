/**
 * 부모 node와 기존 node, 새로운 node를 전달받아 기존 node와 새로운 node를 비교해 차분만 부모 node에 update한다
 * @type {(parentNode: HTMLElement, realNode: HTMLElement|Text, virtualNode: HTMLElement|Text)=>void}
 */
const updateDOM = (parentNode, realNode, virtualNode) => {
  // 기존 node는 없고 새로운 node만 있다면 새로운 node를 추가한다.
  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  // 기존 node는 있고 새로운 node는 없다면 기존 node를 제거한다.
  if (realNode && !virtualNode) {
    parentNode.removeChild(realNode);
    return;
  }

  // 기존 node와 새로운 node 모두 Text node고 기존 node와 새로운 node의 textContent가 다르면 새로운 textContent로 교체한다.
  if (realNode.nodeType === Node.TEXT_NODE && virtualNode.nodeType === Node.TEXT_NODE) {
    if (realNode.textContent !== virtualNode.textContent) realNode.textContent = virtualNode.textContent;
    return;
  }

  // 기존 node 또는 새로운 node가 comment node면 무시한다.
  if (realNode.nodeType === Node.COMMENT_NODE || virtualNode.nodeType === Node.COMMENT_NODE) return;

  // Element.nodeName이 다르면 기존 node를 제거하고 새로운 node로 교체한다. node가 자식을 가진 tree라면 자식 node들 모두 재구축된다.
  if (realNode.nodeName !== virtualNode.nodeName) {
    // realNode 앞에 virtualNode을 삽입한다. realNode는 반드시 존재하며 element node다.
    parentNode.insertBefore(virtualNode, realNode);
    parentNode.removeChild(realNode);
    return;
  }

  // ↓ element.nodeName이 동일한 경우, attribute를 확인해 동일하면 유지하고 다르면 변경한다.

  // virtualNode에 존재하는 어트리뷰트가 realNode에는 존재하지 않거나 어트리뷰트 값이 같지 않으면 realNode에 해당 어트리뷰트를 추가/변경해 virtualNode와 일치시킨다.
  for (const { name, value } of [...virtualNode.attributes]) {
    if (!realNode.hasAttribute(name) || realNode.getAttribute(name) !== value) {
      realNode.setAttribute(name, value);
    }
  }

  // realNode에 존재하는 어트리뷰트가 virtualNode에는 존재하지 않으면 realNode에서 해당 어트리뷰트를 제거해 virtualNode와 일치시킨다.
  for (const { name } of [...realNode.attributes]) {
    if (!virtualNode.hasAttribute(name)) realNode.removeAttribute(name);
  }

  /**
   * element attribute를 일치시켜도 element property는 일치하지 않는 경우가 있다.
   * checked/value/selected 프로퍼티만 비교한다.
   */
  ['checked', 'value', 'selected'].forEach(key => {
    if (realNode[key] !== undefined && virtualNode[key] !== undefined && realNode[key] !== virtualNode[key]) {
      realNode[key] = virtualNode[key];
    }
  });

  // element의 자식 node와 text를 재귀 비교해 DOM에 update한다.
  // eslint-disable-next-line no-use-before-define
  applyDiff(realNode, virtualNode);
};

/**
 * Reconciliation
 * - innerHTML이나 replaceWith를 사용해 기존 DOM tree를 새롭게 생성된 DOM tree와 교체하면 완전히 동일한 node까지
 *   다시 생성해 교체하기 때문에 performance에서 불리할 뿐 아니라 focus를 잃는 등 부작용도 발생한다.
 * - 기존 DOM tree와 새롭게 생성된 DOM tree를 비교해 다른 node, attribute, text 등을 선택적으로 교체해 DOM을 효율적으로 update한다.
 *   - @see https://ko.reactjs.org/docs/reconciliation.html
 * - React는 가상 DOM을 사용하지만 실제 DOM과 새롭게 생성된 DOM을 비교(Incremental DOM)하도록 한다.
 *   - @see https://ui.toast.com/weekly-pick/ko_20210819
 *
 * @type {(realDOM: HTMLElement, virtualDOM: HTMLElement) => void)}
 * - realDOM: 현재 DOM에 반영되어 있는 real DOM
 * - virtualDOM: 새롭게 생성된 virtual DOM
 * - realDOM과 virtualDOM 모두 최상위 부모 node가 root container다.
 *   단, virtualDOM의 root container는 realDOM의 root container를 클론한 객체이므로 DOM update는 realDOM에 한다.
 *
 * TODO: key 지원
 * - @see https://ko.reactjs.org/docs/reconciliation.html#keys
 * - 자식 node들이 key를 가지고 있으면 React는 key를 통해 기존 트리와 이후 트리의 자식들이 일치하는지 확인한다.
 */
const applyDiff = (realDOM, virtualDOM) => {
  // console.log({ oldNode: realDOM.innerHTML, newNode: virtualDOM.innerHTML });

  // node의 text까지 처리해야 하므로 children 대신 childNodes를 사용한다.
  const [realNodes, virtualNodes] = [[...realDOM.childNodes], [...virtualDOM.childNodes]];
  const max = Math.max(realNodes.length, virtualNodes.length);

  for (let i = 0; i < max; i++) {
    updateDOM(realDOM, realNodes[i], virtualNodes[i]);
  }
};

export default applyDiff;
