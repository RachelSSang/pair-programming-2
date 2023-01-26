import events from './events.js';

class Component {
  constructor(props) {
    this.props = props;

    if (!this.addEvents) return;

    const eventData = this.addEvents();
    eventData.forEach(event => {
      const { type, selector, handler } = event;
      if (!events.find(event => type === event.type && selector === event.selector)) {
        if (selector !== 'window')
          event.handler = e => {
            if (!e.target.matches(selector) && !e.target.closest(selector)) return;
            handler(e);
          };
        events.push(event);
      }
    });
  }
}

export default Component;
