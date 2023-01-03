import render from './library/render.js';

// eslint-disable-next-line import/no-mutable-exports
let trelloState = {};

const setTrelloState = newState => {
  trelloState = { ...trelloState, ...newState };
  render();
};

const setInitialState = initialState => {
  trelloState = initialState;
};

const getTrelloState = () => trelloState;

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
  insert(moveListId, targetListId) {
    if (moveListId === targetListId) return;
    const copyLists = [...trelloState.lists];
    const [moveList] = copyLists.filter(({ id }) => id === +moveListId);
    const newLists = copyLists.filter(({ id }) => id !== +moveListId);
    const moveIdx = copyLists.findIndex(({ id }) => id === +moveListId);
    const targetIdx = copyLists.findIndex(({ id }) => id === +targetListId);
    newLists.splice(moveIdx > targetIdx ? targetIdx : targetIdx + 1, 0, moveList);
    setTrelloState({ lists: newLists });
  },
  changeTitle(targetListId, newTitle) {
    const newLists = trelloState.lists.map(list => (list.id === targetListId ? { ...list, title: newTitle } : list));
    setTrelloState({ lists: newLists });
  },
  activeIsEditingTitle(targetListId) {
    const newLists = trelloState.lists.map(list =>
      list.id === targetListId ? { ...list, isEditingTitle: true } : list
    );
    setTrelloState({ lists: newLists });
  },
  inactiveIsEditingTitle(targetListId) {
    const newLists = trelloState.lists.map(list =>
      list.id === targetListId ? { ...list, isEditingTitle: false } : list
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

  insert(moveListId, targetListId, movecardId, targetcardId) {
    if (moveListId === targetListId) {
      if (movecardId === targetcardId) return;
      const copyLists = [...trelloState.lists];
      const [targetList] = copyLists.filter(({ id }) => id === +targetListId);
      const copyCards = [...targetList.cards];
      const [moveCard] = copyCards.filter(({ id }) => id === +movecardId);
      const newCards = copyCards.filter(({ id }) => id !== +movecardId);
      const targetIdx = copyCards.findIndex(({ id }) => id === +targetcardId);
      newCards.splice(targetIdx, 0, moveCard);
      const newLists = copyLists.map(list => (list.id === +targetListId ? { ...list, cards: newCards } : list));
      setTrelloState({ lists: newLists });
      return movecardId;
    }
    const copyLists = [...trelloState.lists];
    const [targetList] = copyLists.filter(({ id }) => id === +targetListId);
    const [moveList] = copyLists.filter(({ id }) => id === +moveListId);
    const copyMoveCards = [...moveList.cards];
    const [moveCard] = copyMoveCards.filter(({ id }) => id === +movecardId);
    const newMoveCards = copyMoveCards.filter(({ id }) => id !== +movecardId);
    const newTargetCards = [...targetList.cards];
    const targetIdx = newTargetCards.findIndex(({ id }) => id === +targetcardId);
    const newId = card.getNewId(targetListId);
    newTargetCards.splice(targetIdx, 0, { ...moveCard, id: newId });
    const newLists = copyLists.map(list =>
      list.id === +targetListId
        ? { ...list, cards: newTargetCards }
        : list.id === +moveListId
        ? { ...list, cards: newMoveCards }
        : list
    );
    setTrelloState({ lists: newLists });
    return newId;
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
  active(listId, cardId) {
    const { modal } = trelloState;
    setTrelloState({ modal: { ...modal, listId, cardId, isOpened: true } });
  },
  inactive() {
    const { modal } = trelloState;
    setTrelloState({ modal: { ...modal, isOpened: false, isEditingTitle: false, isEditingDescription: false } });
  },

  activeIsEditingTitle() {
    const { modal } = trelloState;
    setTrelloState({ modal: { ...modal, isEditingTitle: true } });
  },
  inactiveIsEditingTitle() {
    const { modal } = trelloState;
    setTrelloState({ modal: { ...modal, isEditingTitle: false } });
  },

  activeIsEditingDescription() {
    const { modal } = trelloState;
    setTrelloState({ modal: { ...modal, isEditingDescription: true } });
  },
  inactiveIsEditingDescription() {
    const { modal } = trelloState;
    setTrelloState({ modal: { ...modal, isEditingDescription: false } });
  },
};

export { trelloState, setInitialState, setTrelloState, getTrelloState, trello, list, card, modal };
