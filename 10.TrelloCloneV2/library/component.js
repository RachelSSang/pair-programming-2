import render from './render.js';

let events = [];
class Component {
  constructor() {
    if (this.addEvents) {
      const eventData = this.addEvents();
      eventData.forEach(({ type, selector, handler }) => {
        if (!events.find(event => type === event.type && selector === event.selector)) {
          events = [...events, { type, selector, handler }];
          window.addEventListener(type, e => {
            if (!e.target.matches(selector)) return;
            handler(e);
          });
        }
      });
    }
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    render();
  }
}

export default Component;
