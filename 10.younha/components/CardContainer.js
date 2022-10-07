import CardItem from './CardItem.js';

// prettier-ignore
const CardContainer = cards => `
  <ul class="card-container">
    ${cards.map(card=>`${CardItem(card)}`).join('')}
  </ul>
`

export default CardContainer;
