const reconciliation = (realDom, virtualDom) => {
  // 1. 노드 타입이 다른 경우
  // !!! replaceWith를 할 때 virtualDom이 사라지기 때문에 사라진 노드 뒤의 노드들이 앞으로 한칸씩 땡겨져서 idx가 어긋난다.
  if (realDom.nodeType !== virtualDom.nodeType) {
    console.log('노드 타입이 다른 경우');
    const $tempVirtualDom = virtualDom.cloneNode(true);
    realDom.replaceWith($tempVirtualDom);
    return;
  }

  // 2. 노드 타입이 같은 경우

  // a. realDom이 TEXT_NODE인 경우
  if (realDom.nodeType === Node.TEXT_NODE) {
    // !!! html 작성 방식에 따라 공백을 다르게 처리하므로 trim()으로 해결
    if (realDom.textContent.trim() !== virtualDom.textContent.trim()) {
      console.log('textnode를 바꿔준 경우');
      realDom.textContent = virtualDom.textContent;
    }
    return;
  }

  // b. realDom이 COMMENT_NODE인 경우
  if (realDom.nodeType === Node.COMMENT_NODE) {
    if (realDom.textContent !== virtualDom.textContent) {
      console.log('commentnode를 바꿔준 경우');
      realDom.textContent = virtualDom.textContent;
    }

    return;
  }

  // c. realDom이 ELEMENT_NODE인 경우

  // ㄱ. 엘리먼트의 타입(태그 종류)이 다른 경우
  if (realDom.tagName !== virtualDom.tagName) {
    console.log('elementnode인데 타입이 다른 경우');
    const $tempVirtualDom = virtualDom.cloneNode(true);
    realDom.replaceWith($tempVirtualDom);

    return;
  }

  // 재귀적으로 reconciliation 호출
  let index = 0;
  while (realDom.childNodes[index] || virtualDom.childNodes[index]) {
    if (realDom.childNodes[index] === undefined) {
      // !!! replaceWith뿐 아니라 appendChild도 virtual dom이 빠져서 idx가 어긋난다...
      const $tempVirtualDom = virtualDom.childNodes[index].cloneNode(true);
      realDom.appendChild($tempVirtualDom);
    } else if (virtualDom.childNodes[index] === undefined) {
      console.log('virtualDom이 undefined일 때 realdom 제거');
      realDom.childNodes[index].remove();
    } else {
      reconciliation(realDom.childNodes[index], virtualDom.childNodes[index]);
    }
    index++;
  }

  // ㄴ. 엘리먼트의 타입(태그 종류)이 같은 경우
  // - attribute 비교 및 갱신

  for (const { name, value } of [...virtualDom.attributes]) {
    // !!! 미친놈.. realDom.attributes[name]로 했다가 돌아버릴 뻔 했슈...
    if (!realDom.hasAttribute(name) || value !== realDom.attributes[name].value) {
      console.log('어트리뷰트 추가, 변경', name, value);
      realDom.setAttribute(name, value);
    }
  }

  for (const { name } of [...realDom.attributes]) {
    if (!virtualDom.hasAttribute(name)) {
      realDom.removeAttribute(name);
      console.log('어트리뷰트 제거', name);
    }
  }

  // - property 비교 및 갱신
  // !!! 왜 해야하는지 모르겠다.. -> 알게됐다.(대표적으로 렌더링에 영향을 미치는 input의 value, checked, selected가 있다.ㅇㅅㅇ)
  ['value', 'checked', 'selected'].forEach(key => {
    // 어차피 엘리먼트의 타입(태그 종류)가 같으니까 가지고있는 key의 종류는 같을 것!
    if (realDom[key] !== null && realDom[key] !== virtualDom[key]) {
      realDom[key] = virtualDom[key];
      console.log('프로퍼티추가', key);
    }
  });
};

export default reconciliation;

// [회고]
// - 시간이 남아돌면 attribute중에 style, class 재귀처리 해주던가 말던가!!
// - 시간이 남아돌면 key 처리 해주던가 말던가!!

// - 두 엘리먼트의 타입이 같은 경우 어트리뷰트를 비교하여 동일한 속성은 유지하고 변경된 속성들만 갱신할 때
// 각 요소의 어트리뷰트들을 사전순으로 sort() 후 투포인터를 사용하여 비교했는데,
// sort()는 연산량이 많으므로 지양하고 대신 각 어트리뷰트들에 대해 for문을 한번씩 돌자!
// 이때, for문 내부에서 hasAttribute()메서드를 이용하면 이중 for문을 돌 필요도 없다!

// - 커멘트를 잘 써라

// - html작성 방식에 따라 빈 text노드가 text노드가 아닌 노드들 사이에 생성될 수도, 아닐 수도 있다.
// 만약 realDom과 virtualDom의 html 작성 방식이 다르다면 효율에서 매우 손해를 본다..
// -> trim()으로 해결
