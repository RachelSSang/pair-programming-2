import { eventHolder } from './addEventListener.js';
import App from './App.js';

const render = (rootComponent, $rootContainer) => {
  const domString = rootComponent().render();

  const $virtualDOM = $rootContainer.cloneNode();
  $virtualDOM.innerHTML = domString;

  diff($virtualDOM, $rootContainer);
  // $rootContainer.innerHTML = domString;

  for (const { type, selector, handler } of eventHolder) {
    document.querySelector(selector).addEventListener(type, handler);
  }
};

render(App, document.getElementById('root'));
