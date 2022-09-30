const reconciliation = (realDom, virtualDom) => {
  console.dir(realDom);
  console.dir(virtualDom);
  console.log(Object.entries(realDom));

  // 1. 노드 타입이 다른 경우
  if (realDom.nodeType !== virtualDom.nodeType) {
    realDom.replaceWith(virtualDom);
    return;
  }

  // 2. 노드 타입이 같은 경우

  // a. realDom이 TEXT_NODE인 경우
  if (realDom.nodeType === Node.TEXT_NODE) {
    console.log('textnode인 경우');
    if (realDom.textContent !== virtualDom.textContent) realDom.textContent = virtualDom.textContent;
    return;
  }

  // b. realDom이 COMMENT_NODE인 경우
  if (realDom.nodeType === Node.COMMENT_NODE) {
    console.log('commentnode 경우');
    if (realDom.textContent !== virtualDom.textContent) realDom.textContent = virtualDom.textContent;
    return;
  }

  // c. realDom이 ELEMENT_NODE인 경우

  // ㄱ. 엘리먼트의 타입이 다른 경우
  if (realDom.tagName !== virtualDom.tagName) {
    console.log('elementnode인데 같은 경우');
    realDom.replaceWith(virtualDom);
    return;
  }

  // ㄴ. 엘리먼트의 타입이 같은 경우
  // - attribute 비교 및 갱신
  console.log('elementnode인데 다른 경우');

  for (const { name, value } of [...virtualDom.attributes]) {
    if (!realDom.hasAttribute(name) || value !== realDom.attributes[name]) realDom.setAttribute(name, value);
  }

  for (const { name } of [...realDom.attributes]) {
    if (!virtualDom.hasAttribute(name)) realDom.removeAttribute(name);
  }

  // - property 비교 및 갱신
  // 왜 해야하는지 모르겠다.

  console.log(realDom, virtualDom);
};

// const root = document.querySelector('#root');
/*
const realDom = document.querySelector('.dom');
const newDom = document.createElement('span');
newDom.innerHTML = `
<div class="new-children">
  <div class="new-childchildren">dddddd</div>
</div>
`;
*/
const dom = document.querySelector('.before');
const newDom = document.createElement('span');
newDom.setAttribute('a', 'a');
newDom.setAttribute('b', 'b');
newDom.setAttribute('c', 'c');
newDom.setAttribute('d', 'd');
newDom.innerHTML = `<!--newText-->aaa`;
// newDom.setAttribute('e', 'e');
// newDom.setAttribute('u', 'u');
// newDom.setAttribute('style', `{color:'red', fontweight:'bold'}`);

setTimeout(() => reconciliation(dom, newDom), 1000);

// [회고]
// 시간이 남아돌면 attribute중에 style 재귀처리 해주던가 말던가!!
// - 두 엘리먼트의 타입이 같은 경우 어트리뷰트를 비교하여 동일한 속성은 유지하고 변경된 속성들만 갱신할 때
// 각 요소의 어트리뷰트들을 사전순으로 sort()후 투포인터를 사용하여 비교했는데,
// sort()는 연산량이 많으므로 지양하고 대신 각 어트리뷰트들에 대해 for문을 한번씩 돌자!
// 이때, for문 내부에서 hasAttribute()메서드를 이용하면 이중 for문을 돌 필요도 없다!
