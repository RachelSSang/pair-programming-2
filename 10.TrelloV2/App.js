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
    return `
    ${new Trello().render(this.state)}
    `;
  }

  // 상태변경하는 handler작성
}
