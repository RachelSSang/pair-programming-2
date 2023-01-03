import reconciliation from './reconciliation.js';
import events from './events.js';

let component = null;
let $container = null;
let $virtualRoot = null;
const render = (RootComponent, $rootContainer) => {
  if (RootComponent) component = new RootComponent();
  if ($rootContainer) {
    $container = $rootContainer;
    $virtualRoot = $container.cloneNode();
  }

  $virtualRoot.innerHTML = component.render();
  reconciliation($container, $virtualRoot);

  events.forEach(({ type, selector, handler }) => {
    (selector === 'window' ? window : $container).addEventListener(type, handler);
  });
};

export default render;
