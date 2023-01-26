import Component from './library/Component.js';
import Trello from './components/Trello.js';
import { setInitialGlobalState, getGlobalState } from './library/globalState.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    const localState = JSON.parse(localStorage.getItem('trelloState'));
    if (localState) setInitialGlobalState(localState);
    else
      setInitialGlobalState({
        lists: [],
        modal: { listId: null, cardId: null, isOpened: false, isEditingTitle: false, isEditingDescription: false },
        isAddingList: false,
      });
  }

  render() {
    return `${new Trello().render()}`;
  }

  addEvents() {
    return [
      {
        type: 'beforeunload',
        selector: 'window',
        handler: () => {
          const newList = [
            ...getGlobalState().lists.map(list => (list.isEditingTitle ? { ...list, isEditingTitle: false } : list)),
          ];
          const newTrelloState = {
            ...getGlobalState(),
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
