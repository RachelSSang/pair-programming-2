import { getGlobalState, setGlobalState } from './library/globalState.js';

const trello = {
  activeAddingList() {
    setGlobalState({ isAddingList: true });
  },
  inactiveAddingList() {
    setGlobalState({ isAddingList: false });
  },
};

const list = {
  getNewId() {
    return Math.max(...getGlobalState().lists.map(({ id }) => id), 0) + 1;
  },

  add(newTitle) {
    const newList = {
      id: this.getNewId(),
      title: newTitle,
      cards: [],
      isEditingTitle: false,
      isAddingCard: false,
    };
    const newLists = [...getGlobalState().lists, newList];
    setGlobalState({ lists: newLists });
  },

  remove(targetListId) {
    const newLists = getGlobalState().lists.filter(({ id }) => id !== targetListId);
    setGlobalState({ lists: newLists });
  },
  insert(moveListId, targetListId) {
    if (moveListId === targetListId) return;
    const copyLists = [...getGlobalState().lists];
    const [moveList] = copyLists.filter(({ id }) => id === +moveListId);
    const newLists = copyLists.filter(({ id }) => id !== +moveListId);
    const moveIdx = copyLists.findIndex(({ id }) => id === +moveListId);
    const targetIdx = copyLists.findIndex(({ id }) => id === +targetListId);
    newLists.splice(moveIdx > targetIdx ? targetIdx : targetIdx + 1, 0, moveList);
    setGlobalState({ lists: newLists });
  },
  changeTitle(targetListId, newTitle) {
    const newLists = getGlobalState().lists.map(list =>
      list.id === targetListId ? { ...list, title: newTitle } : list
    );
    setGlobalState({ lists: newLists });
  },
  activeIsEditingTitle(targetListId) {
    const newLists = getGlobalState().lists.map(list =>
      list.id === targetListId ? { ...list, isEditingTitle: true } : list
    );
    setGlobalState({ lists: newLists });
  },
  inactiveIsEditingTitle(targetListId) {
    const newLists = getGlobalState().lists.map(list =>
      list.id === targetListId ? { ...list, isEditingTitle: false } : list
    );
    setGlobalState({ lists: newLists });
  },
  activeAddingCard(targetListId) {
    const newLists = getGlobalState().lists.map(list =>
      list.id === targetListId ? { ...list, isAddingCard: true } : list
    );
    setGlobalState({ lists: newLists });
  },
  inactiveAddingCard(targetListId) {
    const newLists = getGlobalState().lists.map(list =>
      list.id === targetListId ? { ...list, isAddingCard: false } : list
    );
    setGlobalState({ lists: newLists });
  },
  getListById(targetListId) {
    const [targetList] = getGlobalState().lists.filter(({ id }) => id === targetListId);
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
    const newLists = getGlobalState().lists.map(list =>
      list.id === targetListId ? { ...list, cards: newCards } : list
    );
    setGlobalState({ lists: newLists });
  },

  remove(targetListId, targetCardId) {
    const newCards = list.getListById(targetListId).cards.filter(({ id }) => id !== targetCardId);
    const newLists = getGlobalState().lists.map(list =>
      list.id === targetListId ? { ...list, cards: newCards } : list
    );
    setGlobalState({ lists: newLists });
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
    const newLists = getGlobalState().lists.map(list =>
      list.id === targetListId1
        ? { ...list, cards: newCards1 }
        : list.id === targetListId2
        ? { ...list, cards: newCards2 }
        : list
    );
    setGlobalState({ lists: newLists });
  },

  insert(moveListId, targetListId, movecardId, targetcardId) {
    if (moveListId === targetListId) {
      if (movecardId === targetcardId) return;
      const copyLists = [...getGlobalState().lists];
      const [targetList] = copyLists.filter(({ id }) => id === +targetListId);
      const copyCards = [...targetList.cards];
      const [moveCard] = copyCards.filter(({ id }) => id === +movecardId);
      const newCards = copyCards.filter(({ id }) => id !== +movecardId);
      const targetIdx = copyCards.findIndex(({ id }) => id === +targetcardId);
      newCards.splice(targetIdx, 0, moveCard);
      const newLists = copyLists.map(list => (list.id === +targetListId ? { ...list, cards: newCards } : list));
      setGlobalState({ lists: newLists });
      return movecardId;
    }
    const copyLists = [...getGlobalState().lists];
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
    setGlobalState({ lists: newLists });
    return newId;
  },

  changeTitle(targetListId, targetCardId, newTitle) {
    const newCards = list
      .getListById(targetListId)
      .cards.map(card => (card.id === targetCardId ? { ...card, title: newTitle } : card));
    const newLists = getGlobalState().lists.map(list =>
      list.id === targetListId ? { ...list, cards: newCards } : list
    );
    setGlobalState({ lists: newLists });
  },

  changeDescription(targetListId, targetCardId, newDescription) {
    const newCards = list
      .getListById(targetListId)
      .cards.map(card => (card.id === targetCardId ? { ...card, description: newDescription } : card));
    const newLists = getGlobalState().lists.map(list =>
      list.id === targetListId ? { ...list, cards: newCards } : list
    );
    setGlobalState({ lists: newLists });
  },

  getCardById(targetListId, targetCardId) {
    const targetList = list.getListById(targetListId);
    const [targetCard] = targetList.cards.filter(({ id }) => id === targetCardId);
    return targetCard;
  },
};

const modal = {
  active(listId, cardId) {
    const { modal } = getGlobalState();
    setGlobalState({ modal: { ...modal, listId, cardId, isOpened: true } });
  },
  inactive() {
    const { modal } = getGlobalState();
    setGlobalState({ modal: { ...modal, isOpened: false, isEditingTitle: false, isEditingDescription: false } });
  },

  activeIsEditingTitle() {
    const { modal } = getGlobalState();
    setGlobalState({ modal: { ...modal, isEditingTitle: true } });
  },
  inactiveIsEditingTitle() {
    const { modal } = getGlobalState();
    setGlobalState({ modal: { ...modal, isEditingTitle: false } });
  },

  activeIsEditingDescription() {
    const { modal } = getGlobalState();
    setGlobalState({ modal: { ...modal, isEditingDescription: true } });
  },
  inactiveIsEditingDescription() {
    const { modal } = getGlobalState();
    setGlobalState({ modal: { ...modal, isEditingDescription: false } });
  },
};

export { trello, list, card, modal };
