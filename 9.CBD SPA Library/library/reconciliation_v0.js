const reconciliation = (parent, dom, newDom) => {
  // dom과 newDOM을 비교하면서 새로운 요소만 dom에 갱신

  // 엘리먼트의 타입이 다른 경우
  if (dom.tagName !== newDom.tagName) parent.replaceChild(newDom, dom);
  // 엘리먼트의 타입이 같은 경우
  else {
    const domAttributes = [...dom.attributes];
    const newDomAttributes = [...newDom.attributes];

    console.log(domAttributes, newDomAttributes);

    // 투포인터를 이용한 attributes 비교 및 갱신
    domAttributes.sort((x, y) => (x.nodeName > y.nodeName ? 1 : -1));
    newDomAttributes.sort((x, y) => (x.nodeName > y.nodeName ? 1 : -1));

    let [domIdx, newDomIdx] = [0, 0];
    while (domIdx < domAttributes.length || newDomIdx < newDomAttributes.length) {
      if (domIdx >= domAttributes.length) {
        dom.setAttribute(newDomAttributes[newDomIdx]?.name, newDomAttributes[newDomIdx]?.value);
        console.log(newDomAttributes[newDomIdx]?.value, '추가해!!');
        newDomIdx++;
        continue;
      }

      // console.log(domAttributes[domIdx]?.name, newDomAttributes[newDomIdx]?.name);
      if (domAttributes[domIdx]?.name === newDomAttributes[newDomIdx]?.name) {
        if (domAttributes[domIdx]?.value !== newDomAttributes[newDomIdx]?.value) {
          // console.log(newDomAttributes[newDomIdx].value, '덮어써!!');
          dom.setAttribute(domAttributes[domIdx].name, newDomAttributes[newDomIdx].value);
        }
        domIdx++;
        newDomIdx++;
      } else if (domAttributes[domIdx]?.name > newDomAttributes[newDomIdx]?.name) {
        // console.log(newDomAttributes[newDomIdx]?.value, '추가해!!');
        dom.setAttribute(newDomAttributes[newDomIdx]?.name, newDomAttributes[newDomIdx]?.value);
        newDomIdx++;
      } else {
        // console.log(domAttributes[domIdx]?.name, '삭제해!!');
        dom.removeAttribute(domAttributes[domIdx]?.name);
        domIdx++;
      }
    }

    console.log(dom, newDom);
  }
};

const root = document.querySelector('#root');
/*
const dom = document.querySelector('.dom');
const newDom = document.createElement('span');
newDom.innerHTML = `
<div class="new-children">
  <div class="new-childchildren">dddddd</div>
</div>
`;
*/
const dom = document.querySelector('.before');
const newDom = document.createElement('div');
newDom.setAttribute('a', 'a');
newDom.setAttribute('b', 'b');
newDom.setAttribute('c', 'c');
newDom.setAttribute('d', 'd');
newDom.setAttribute('e', 'e');
newDom.setAttribute('u', 'u');
newDom.setAttribute('style', `{color:'red', fontweight:'bold'}`);

reconciliation(root, dom, newDom);

// 시간이 남아돌면 attribute중에 style 재귀처리 해주던가 말던가!!
