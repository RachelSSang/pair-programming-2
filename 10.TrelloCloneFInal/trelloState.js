import render from './library/dom/render.js';

// eslint-disable-next-line import/no-mutable-exports
let trelloState = {
  lists: [
    {
      id: 1,
      title: 'Tasks To Do1',
      cards: [
        { id: 1, title: 'React', description: 'learning react!' },
        { id: 2, title: 'TypeScript', description: '' },
      ],
      isEditingTitle: false,
      isAddingCard: false,
    },
    {
      id: 2,
      title: 'Completed Tasks',
      cards: [
        { id: 1, title: 'HTML', description: '' },
        { id: 2, title: 'CSS', description: '' },
        { id: 3, title: 'JavaScript', description: '' },
      ],
      isEditingTitle: false,
      isAddingCard: false,
    },
    {
      id: 3,
      title: 'Ongoing Project',
      cards: [
        { id: 1, title: 'VegiTime', description: '' },
        { id: 2, title: 'Trello', description: '' },
        { id: 3, title: 'Vinyl arrange', description: '' },
      ],
      isEditingTitle: false,
      isAddingCard: false,
    },
  ],
  modal: {
    isOpened: false,
    isEditingTitle: false,
    isEditingDescription: false,
  },
  isAddingList: false,
};

const setTrelloState = newState => {
  trelloState = { ...trelloState, ...newState };
  render();
};

const trello = {
  activeAddingList() {
    setTrelloState({ isAddingList: true });
  },
  inactiveAddingList() {
    setTrelloState({ isAddingList: false });
  },
};

const list = {
  getNewId() {
    return Math.max(...trelloState.lists.map(({ id }) => id), 0) + 1;
  },

  add(newTitle) {
    const newList = {
      id: this.getNewId(),
      title: newTitle,
      cards: [],
      isEditingTitle: false,
      isAddingCard: false,
    };
    const newLists = [...trelloState.lists, newList];
    setTrelloState({ lists: newLists });
  },

  remove(targetListId) {
    const newLists = trelloState.lists.filter(({ id }) => id !== targetListId);
    setTrelloState({ lists: newLists });
  },

  //TODO: 리스트 순서 변경이 아니라 삽입
  swap(listId1, listId2) {
    const newLists = [...trelloState.lists];
    const [idx1, idx2] = [
      newLists.findIndex(({ id }) => id === +listId1),
      newLists.findIndex(({ id }) => id === +listId2),
    ];
    [newLists[idx1], newLists[idx2]] = [newLists[idx2], newLists[idx1]];
    setTrelloState({ lists: newLists });
  },
  insert(moveListId, targetListId) {
    const copyLists = [...trelloState.lists];
    const [moveList] = copyLists.filter(({ id }) => id === +moveListId);
    const newLists = copyLists.filter(({ id }) => id !== +moveListId);
    const targetIdx = newLists.findIndex(({ id }) => id === +targetListId);
    newLists.splice(targetIdx + 1, 0, moveList);
    console.log('inser', newLists);
    setTrelloState({ lists: newLists });
  },
  changeTitle(targetListId, newTitle) {
    const newLists = trelloState.lists.map(list => (list.id === targetListId ? { ...list, title: newTitle } : list));
    setTrelloState({ lists: newLists });
  },

  toggleIsEditingTitle(targetListId) {
    const newLists = trelloState.lists.map(list =>
      list.id === targetListId ? { ...list, isEditingTitle: !list.isEditingTitle } : list
    );
    setTrelloState({ lists: newLists });
  },
  activeAddingCard(targetListId) {
    const newLists = trelloState.lists.map(list => (list.id === targetListId ? { ...list, isAddingCard: true } : list));
    setTrelloState({ lists: newLists });
  },
  inactiveAddingCard(targetListId) {
    const newLists = trelloState.lists.map(list =>
      list.id === targetListId ? { ...list, isAddingCard: false } : list
    );
    setTrelloState({ lists: newLists });
  },
  getListById(targetListId) {
    const [targetList] = trelloState.lists.filter(({ id }) => id === targetListId);
    return targetList;
  },
};

const card = {
  getNewId(targetListId) {
    const { cards: targetCards } = list.getListById(targetListId);
    return Math.max(...targetCards.map(({ id }) => id), 0) + 1;
  },

  add(targetListId, title) {
    const newCard = { id: this.getNewId(targetListId), title, description: '' };
    const newCards = [...list.getListById(targetListId).cards, newCard];
    const newLists = trelloState.lists.map(list => (list.id === targetListId ? { ...list, cards: newCards } : list));
    setTrelloState({ lists: newLists });
  },

  remove(targetListId, targetCardId) {
    const newCards = list.getListById(targetListId).cards.filter(({ id }) => id !== targetCardId);
    const newLists = trelloState.lists.map(list => (list.id === targetListId ? { ...list, cards: newCards } : list));
    setTrelloState({ lists: newLists });
  },

  //  카드 순서 변경이 아니라 삽입
  swap(targetListId1, targetListId2, cardId1, cardId2) {
    let newCards1 = [...list.getListById(targetListId1).cards];
    let newCards2 = [...list.getListById(targetListId2).cards];
    const [idx1, idx2] = [
      newCards1.findIndex(({ id }) => id === cardId1),
      newCards2.findIndex(({ id }) => id === cardId2),
    ];
    if (targetListId1 === targetListId2) [newCards1[idx1], newCards1[idx2]] = [newCards1[idx2], newCards1[idx1]];
    else {
      newCards1 = newCards1.map(card => (card.id === cardId1 ? { ...card, id: this.getNewId(targetListId2) } : card));
      newCards2 = newCards2.map(card => (card.id === cardId2 ? { ...card, id: this.getNewId(targetListId1) } : card));
      [newCards1[idx1], newCards2[idx2]] = [newCards2[idx2], newCards1[idx1]];
    }
    const newLists = trelloState.lists.map(list =>
      list.id === targetListId1
        ? { ...list, cards: newCards1 }
        : list.id === targetListId2
        ? { ...list, cards: newCards2 }
        : list
    );
    setTrelloState({ lists: newLists });
  },

  changeTitle(targetListId, targetCardId, newTitle) {
    const newCards = list
      .getListById(targetListId)
      .cards.map(card => (card.id === targetCardId ? { ...card, title: newTitle } : card));
    const newLists = trelloState.lists.map(list => (list.id === targetListId ? { ...list, cards: newCards } : list));
    setTrelloState({ lists: newLists });
  },

  changeDescription(targetListId, targetCardId, newDescription) {
    const newCards = list
      .getListById(targetListId)
      .cards.map(card => (card.id === targetCardId ? { ...card, description: newDescription } : card));
    const newLists = trelloState.lists.map(list => (list.id === targetListId ? { ...list, cards: newCards } : list));
    setTrelloState({ lists: newLists });
  },

  getCardById(targetListId, targetCardId) {
    const targetList = list.getListById(targetListId);
    const [targetCard] = targetList.cards.filter(({ id }) => id === targetCardId);
    return targetCard;
  },
};

const modal = {
  toggle() {
    const { modal } = trelloState;
    const { isOpened } = modal;
    setTrelloState({ modal: { ...modal, isOpened: !isOpened } });
  },

  activeIsEditingTitle() {
    const { modal } = trelloState;
    setTrelloState({ modal: { ...modal, isEditingTitle: true } });
  },
  inactiveIsEditingTitle() {
    const { modal } = trelloState;
    setTrelloState({ modal: { ...modal, isEditingTitle: false } });
  },

  toggleIsEditingTitle() {
    const { modal } = trelloState;
    const { isEditingTitle } = modal;
    setTrelloState({ modal: { ...modal, isEditingTitle: !isEditingTitle } });
  },

  activeIsEditingDescription() {
    const { modal } = trelloState;
    setTrelloState({ modal: { ...modal, isEditingDescription: true } });
  },
  inactiveIsEditingDescription() {
    const { modal } = trelloState;
    setTrelloState({ modal: { ...modal, isEditingDescription: false } });
  },

  toggleIsEditingDescription() {
    const { modal } = trelloState;
    const { isEditingDescription } = modal;
    setTrelloState({ modal: { ...modal, isEditingDescription: !isEditingDescription } });
  },
};

export { trelloState, setTrelloState, trello, list, card, modal };
