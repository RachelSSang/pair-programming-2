import render from './render.js';
import events from './events.js';

class Component {
  constructor(props) {
    this.props = props;
    if (!this.addEventListener) return;

    const eventData = this.addEventListener();

    eventData.forEach(event => {
      const { type, selector, handler } = event;

      if (!events.find(({ type: _type, selector: _selector }) => type === _type && selector === _selector)) {
        event.handler = e => {
          if (selector === 'window') handler(e);
          if (!e.target.matches(selector) && !e.target.closest(selector)) return;
          handler(e);
        };
        // events = [...events, { type, selector, handler }];

        events.push({ type, selector, handler: event.handler });
      }
    });
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    render();
  }
}

export default Component;
