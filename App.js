import Component from './library/Component.js';
import Trello from './components/Trello.js';
import { setInitialState, getTrelloState } from './trelloState.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    const localState = JSON.parse(localStorage.getItem('trelloState'));
    if (localState) setInitialState(localState);
    else
      setInitialState({
        lists: [],
        modal: { listId: null, cardId: null, isOpened: false, isEditingTitle: false, isEditingDescription: false },
        isAddingList: false,
      });
  }

  render() {
    return `${new Trello().render()}`;
  }

  addEventListener() {
    return [
      {
        type: 'beforeunload',
        selector: 'window',
        handler: () => {
          const newList = [
            ...getTrelloState().lists.map(list => (list.isEditingTitle ? { ...list, isEditingTitle: false } : list)),
          ];
          const newTrelloState = {
            ...getTrelloState(),
            list: newList,
            modal: { listId: null, cardId: null, isOpened: false, isEditingTitle: false, isEditingDescription: false },
          };
          localStorage.setItem('trelloState', JSON.stringify(newTrelloState));
        },
      },
    ];
  }
}

export default App;
