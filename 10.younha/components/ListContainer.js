import ListItem from './ListItem.js';

// prettier-ignore
const ListContainer = Lists => `
  <ul class="list-container">
    ${Lists.map(list=>ListItem(list)).join('')}
  </ul>
  <button class="list-add-another">+Add another list</button>
`;

export default ListContainer;
