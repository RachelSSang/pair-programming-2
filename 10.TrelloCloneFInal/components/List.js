import Component from '../library/core/Component.js';
import Card from './Card.js';

class List extends Component {
  render() {
    const { title, cards } = this.props.board;
    return `
      <h2>${title}</h2>
      ${cards.map(card => new Card({ card }).render()).join('')}
      <button>+Add a card</button>
    `;
  }
}

export default List;
