import Component from './library/component.js';
import Trello from './components/Trello/Trello.js';
// import Popup from './components/Popup/Popup.js';

export default class App extends Component {
  constructor() {
    super();

    // 상태
    this.state = {
      boards: [
        {
          id: 1,
          title: 'Tasks To Do',
          cards: [
            { id: 1, title: 'React', description: 'learning react!' },
            { id: 2, title: 'TypeScript', description: '' },
          ],
          isEditing: false,
        },
        {
          id: 2,
          title: 'Completed Tasks',
          cards: [
            { id: 1, title: 'HTML', description: '' },
            { id: 2, title: 'CSS', description: '' },
            { id: 3, title: 'JavaScript', description: '' },
          ],
          isEditing: false,
        },
      ],
    };
  }

  // App 렌더링
  render() {
    return `${new Trello({
      toggleIsEditing: this.toggleIsEditing.bind(this),
      addCard: this.addCard.bind(this),
      changeBoardTitle: this.changeBoardTitle.bind(this),
      addBoard: this.addBoard.bind(this),
    }).render(this.state)}`;
  }

  // 상태변경하는 handler작성
  toggleIsEditing(e) {
    const idx = +e.target.closest('.board').dataset.boardid;
    this.setState({
      boards: this.state.boards.map(board => ({
        ...board,
        isEditing: board.id === idx ? !board.isEditing : board.isEditing,
      })),
    });
  }

  getNewCardId(boardIdx) {
    return Math.max(...this.state.boards.find(board => board.id === boardIdx).cards.map(card => +card.id), 0);
  }

  addCard(e) {
    const idx = +e.target.closest('.board').dataset.boardid;

    // prettier-ignore
    this.setState({boards: this.state.boards.map(board =>
      board.id !== idx
        ? board
        : {...board, cards: [...board.cards, { id: this.getNewCardId(idx), title: e.target.querySelector('.board-form-textarea').value, description: ''}]}
    )});
  }

  changeBoardTitle(e) {
    const idx = +e.target.closest('.board').dataset.boardid;

    this.setState({
      boards: this.state.boards.map(board =>
        board.id === idx && e.target.value.trim() ? { ...board, title: e.target.value.trim() } : board
      ),
    });
  }

  getNewBoardId() {
    return Math.max(...this.state.boards.map(board => +board.id), 0) + 1;
  }

  addBoard(e) {
    this.setState({
      boards: [
        ...this.state.boards,
        {
          id: this.getNewBoardId(),
          title: e.target.querySelector('.trello-form-textarea').value,
          cards: [],
          isEditing: false,
        },
      ],
    });
  }
}
