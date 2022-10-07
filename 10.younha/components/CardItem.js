// prettier-ignore
const CardItem = ({id, title, description})=>`
    <li class="card" data-card-id="${id}">
      <input type="text" placeholder="Enter a title for this card..." value="${title}" class="card-title" />
      <div class="${description===""?"hidden":"icon"}">${description===""?"hidden":"icon"}</div>
    </li>
`

export default CardItem;
