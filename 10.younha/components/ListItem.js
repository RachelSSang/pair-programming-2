import CardContainer from './CardContainer.js';

// prettier-ignore
const ListItem = ({id, title, cards})=>`
  <li class="list" data-list-id="${id}">
    <input type="text" placeholder="Enter list title..." value="${title}" class="list-title" />
    ${CardContainer(cards)}
    <button class="card-add ${title===''?"":"hidden"}">+Add a card ${title===''?"":"hidden"}</button>
    <button class="list-add ${title===''?"hidden":""}">Add list ${title===''?"hidden":""}</button>
    <button class="list-close ${title===''?"hidden":""}">X ${title===''?"hidden":""}</button>
  </li>
`

export default ListItem;
