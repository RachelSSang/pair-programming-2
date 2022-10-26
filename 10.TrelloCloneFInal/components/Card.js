import Component from '../library/core/Component.js';

class Card extends Component {
  render() {
    const { title, description } = this.props.card;

    return `    
      <h3>${title}</h3>
      ${description ? `<i class='bx bx-signal-3 bx-rotate-90 bx-flip-horizontal'></i>` : ''}
    `;
  }
}

export default Card;
