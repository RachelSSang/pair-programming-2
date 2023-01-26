import Component from './library/Component.js';
import Trello from './components/Trello.js';
import { setInitialGlobalState, setGlobalState, getGlobalState } from './library/globalState.js';

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
          setGlobalState(beforeState => {
            const newList = [
              ...beforeState.lists.map(list => ({ ...list, isEditingTitle: false, isAddingCard: false })),
            ];
            const newTrelloState = {
              ...beforeState,
              isAddingList: false,
              lists: newList,
              modal: {
                listId: null,
                cardId: null,
                isOpened: false,
                isEditingTitle: false,
                isEditingDescription: false,
              },
            };
            return newTrelloState;
          });
          localStorage.setItem('trelloState', JSON.stringify(getGlobalState()));
        },
      },
    ];
  }
}

export default App;
