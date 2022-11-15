import render from './library/dom/render.js';

// eslint-disable-next-line import/no-mutable-exports
let trelloState = {
  lists: [
    {
      id: 4,
      title: 'Tasks To Do4',
      cards: [
        { id: 1, title: 'React', description: 'learning react!' },
        { id: 2, title: 'TypeScript', description: '' },
        { id: 3, title: 'younha!!', description: '' },
      ],
      isEditingTitle: false,
      isAddingCard: false,
    },
    {
      id: 3,
      title: 'Tasks To Do3',
      cards: [
        { id: 1, title: 'React', description: 'learning react!' },
        { id: 2, title: 'TypeScript', description: '' },
      ],
      isEditingTitle: false,
      isAddingCard: false,
    },
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

  // TODO: 리스트 순서 변경
  swap(listId1, listId2) {
    const newLists = [...trelloState.lists];
    const [idx1, idx2] = [
      newLists.findIndex(({ id }) => id === +listId1),
      newLists.findIndex(({ id }) => id === +listId2),
    ];
    [newLists[idx1], newLists[idx2]] = [newLists[idx2], newLists[idx1]];
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

  // 카드 순서 변경
  swap(targetListId, cardId1, cardId2) {
    const newCards = [...list.getListById(targetListId).cards];
    const [idx1, idx2] = [
      newCards.findIndex(({ id }) => id === cardId1),
      newCards.findIndex(({ id }) => id === cardId2),
    ];
    [newCards[idx1], newCards[idx2]] = [newCards[idx2], newCards[idx1]];
    const newLists = trelloState.lists.map(list => (list.id === targetListId ? { ...list, cards: newCards } : list));
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
