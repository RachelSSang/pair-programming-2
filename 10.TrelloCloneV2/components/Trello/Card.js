import Component from '../../library/component.js';

export default class Card extends Component {
  render({ id, title, description }) {
    return `
    <div class="card" data-cardid="${id}">
      ${title}
      ${description === '' ? '' : `<i class='bx bx-signal-3 bx-rotate-90 bx-flip-horizontal'></i>`}
    </div>`;
  }
}
