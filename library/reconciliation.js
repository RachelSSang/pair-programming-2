const reconciliation = (realDom, virtualDom) => {
  if (realDom.nodeType !== virtualDom.nodeType) {
    const $tempVirtualDom = virtualDom.cloneNode(true);
    realDom.replaceWith($tempVirtualDom);
    return;
  }

  if (realDom.nodeType === Node.TEXT_NODE) {
    if (realDom.textContent.trim() !== virtualDom.textContent.trim()) {
      realDom.textContent = virtualDom.textContent;
    }
    return;
  }

  if (realDom.nodeType === Node.COMMENT_NODE) {
    if (realDom.textContent !== virtualDom.textContent) {
      realDom.textContent = virtualDom.textContent;
    }

    return;
  }

  if (realDom.tagName !== virtualDom.tagName) {
    const $tempVirtualDom = virtualDom.cloneNode(true);
    realDom.replaceWith($tempVirtualDom);

    return;
  }

  for (const { name, value } of [...virtualDom.attributes]) {
    if (!realDom.hasAttribute(name) || value !== realDom.attributes[name].value) {
      realDom.setAttribute(name, value);
    }
  }

  for (const { name } of [...realDom.attributes]) {
    if (!virtualDom.hasAttribute(name)) {
      realDom.removeAttribute(name);
    }
  }

  ['value', 'checked', 'selected'].forEach(key => {
    if (realDom[key] !== null && realDom[key] !== virtualDom[key]) {
      realDom[key] = virtualDom[key];
    }
  });

  let index = 0;
  while (realDom.childNodes[index] || virtualDom.childNodes[index]) {
    if (realDom.childNodes[index] === undefined) {
      const $tempVirtualDom = virtualDom.childNodes[index].cloneNode(true);
      realDom.appendChild($tempVirtualDom);
    } else if (virtualDom.childNodes[index] === undefined) {
      realDom.childNodes[index].remove();
    } else {
      reconciliation(realDom.childNodes[index], virtualDom.childNodes[index]);
    }
    index++;
  }
};

export default reconciliation;
