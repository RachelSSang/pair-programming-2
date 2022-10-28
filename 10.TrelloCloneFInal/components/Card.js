import Component from '../library/core/Component.js';

class Card extends Component {
  render() {
    const { title, description } = this.props.card;

    return `    
      <h3>${title}</h3>
      ${description ? `<box-icon name="signal-3" rotate="90"></box-icon>` : ''}
      <box-icon class="hidden" name="pencil"></box-icon>
    `;
  }
}

export default Card;
