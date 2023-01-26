import { getGlobalState, setGlobalState } from './library/globalState.js';

const trello = {
  activeAddingList() {
    setGlobalState(beforeState => ({ ...beforeState, isAddingList: true }));
  },
  inactiveAddingList() {
    setGlobalState(beforeState => ({ ...beforeState, isAddingList: false }));
  },
};

const list = {
  getNewId() {
    return Math.max(...getGlobalState().lists.map(({ id }) => id), 0) + 1;
  },

  add(newTitle) {
    setGlobalState(beforeState => {
      const newList = {
        id: this.getNewId(),
        title: newTitle,
        cards: [],
        isEditingTitle: false,
        isAddingCard: false,
      };
      const newLists = [...beforeState.lists, newList];
      return { ...beforeState, lists: newLists };
    });
  },

  remove(targetListId) {
    setGlobalState(beforeState => {
      const newLists = beforeState.lists.filter(({ id }) => id !== targetListId);
      return { ...beforeState, lists: newLists };
    });
  },

  insert(moveListId, targetListId) {
    if (moveListId === targetListId) return;
    setGlobalState(beforeState => {
      const copyLists = [...beforeState.lists];
      const [moveList] = copyLists.filter(({ id }) => id === +moveListId);
      const newLists = copyLists.filter(({ id }) => id !== +moveListId);
      const moveIdx = copyLists.findIndex(({ id }) => id === +moveListId);
      const targetIdx = copyLists.findIndex(({ id }) => id === +targetListId);
      newLists.splice(moveIdx > targetIdx ? targetIdx : targetIdx + 1, 0, moveList);
      return { ...beforeState, lists: newLists };
    });
  },

  changeTitle(targetListId, newTitle) {
    setGlobalState(beforeState => {
      const newLists = beforeState.lists.map(list => (list.id === targetListId ? { ...list, title: newTitle } : list));
      return { ...beforeState, lists: newLists };
    });
  },

  activeIsEditingTitle(targetListId) {
    setGlobalState(beforeState => {
      const newLists = beforeState.lists.map(list =>
        list.id === targetListId ? { ...list, isEditingTitle: true } : list
      );
      return { ...beforeState, lists: newLists };
    });
  },

  inactiveIsEditingTitle(targetListId) {
    setGlobalState(beforeState => {
      const newLists = beforeState.lists.map(list =>
        list.id === targetListId ? { ...list, isEditingTitle: false } : list
      );
      return { ...beforeState, lists: newLists };
    });
  },

  activeAddingCard(targetListId) {
    setGlobalState(beforeState => {
      const newLists = beforeState.lists.map(list =>
        list.id === targetListId ? { ...list, isAddingCard: true } : list
      );
      return { ...beforeState, lists: newLists };
    });
  },

  inactiveAddingCard(targetListId) {
    setGlobalState(beforeState => {
      const newLists = beforeState.lists.map(list =>
        list.id === targetListId ? { ...list, isAddingCard: false } : list
      );
      return { ...beforeState, lists: newLists };
    });
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
    setGlobalState(beforeState => {
      const newLists = beforeState.lists.map(list => (list.id === targetListId ? { ...list, cards: newCards } : list));
      return { ...beforeState, lists: newLists };
    });
  },

  remove(targetListId, targetCardId) {
    const newCards = list.getListById(targetListId).cards.filter(({ id }) => id !== targetCardId);
    setGlobalState(beforeState => {
      const newLists = beforeState.lists.map(list => (list.id === targetListId ? { ...list, cards: newCards } : list));
      return { ...beforeState, lists: newLists };
    });
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
    setGlobalState(beforeState => {
      const newLists = beforeState.lists.map(list =>
        list.id === targetListId1
          ? { ...list, cards: newCards1 }
          : list.id === targetListId2
          ? { ...list, cards: newCards2 }
          : list
      );
      return { ...beforeState, lists: newLists };
    });
  },

  insert(moveListId, targetListId, movecardId, targetcardId) {
    let newId = null;

    setGlobalState(beforeState => {
      if (moveListId === targetListId) {
        if (movecardId === targetcardId) return;
        const copyLists = [...beforeState.lists];
        const [targetList] = copyLists.filter(({ id }) => id === +targetListId);
        const copyCards = [...targetList.cards];
        const [moveCard] = copyCards.filter(({ id }) => id === +movecardId);
        const newCards = copyCards.filter(({ id }) => id !== +movecardId);
        const targetIdx = copyCards.findIndex(({ id }) => id === +targetcardId);
        newCards.splice(targetIdx, 0, moveCard);
        newId = movecardId;
        const newLists = copyLists.map(list => (list.id === +targetListId ? { ...list, cards: newCards } : list));
        return { ...beforeState, lists: newLists };
      }
      const copyLists = [...beforeState.lists];
      const [targetList] = copyLists.filter(({ id }) => id === +targetListId);
      const [moveList] = copyLists.filter(({ id }) => id === +moveListId);
      const copyMoveCards = [...moveList.cards];
      const [moveCard] = copyMoveCards.filter(({ id }) => id === +movecardId);
      const newMoveCards = copyMoveCards.filter(({ id }) => id !== +movecardId);
      const newTargetCards = [...targetList.cards];
      const targetIdx = newTargetCards.findIndex(({ id }) => id === +targetcardId);
      newId = card.getNewId(targetListId);
      newTargetCards.splice(targetIdx, 0, { ...moveCard, id: newId });
      const newLists = copyLists.map(list =>
        list.id === +targetListId
          ? { ...list, cards: newTargetCards }
          : list.id === +moveListId
          ? { ...list, cards: newMoveCards }
          : list
      );

      return { ...beforeState, lists: newLists };
    });

    return newId;
  },

  changeTitle(targetListId, targetCardId, newTitle) {
    setGlobalState(beforeState => {
      const newCards = list
        .getListById(targetListId)
        .cards.map(card => (card.id === targetCardId ? { ...card, title: newTitle } : card));
      const newLists = beforeState.lists.map(list => (list.id === targetListId ? { ...list, cards: newCards } : list));
      return { ...beforeState, lists: newLists };
    });
  },

  changeDescription(targetListId, targetCardId, newDescription) {
    setGlobalState(beforeState => {
      const newCards = list
        .getListById(targetListId)
        .cards.map(card => (card.id === targetCardId ? { ...card, description: newDescription } : card));
      const newLists = beforeState.lists.map(list => (list.id === targetListId ? { ...list, cards: newCards } : list));
      return { ...beforeState, lists: newLists };
    });
  },

  getCardById(targetListId, targetCardId) {
    const targetList = list.getListById(targetListId);
    const [targetCard] = targetList.cards.filter(({ id }) => id === targetCardId);
    return targetCard;
  },
};

const modal = {
  active(listId, cardId) {
    document.addEventListener('keyup', e => {
      if (e.key.toLowerCase().includes('escape')) this.inactive();
    });
    document.documentElement.style.overflow = 'hidden';
    document.getElementById('root').setAttribute('aria-hidden', 'true');

    setGlobalState(beforeState => {
      const { modal } = beforeState;
      return { ...beforeState, modal: { ...modal, listId, cardId, isOpened: true } };
    });
  },

  inactive() {
    document.removeEventListener('keyup', e => {
      if (e.key.toLowerCase().includes('escape')) this.inactive();
    });
    document.documentElement.style.overflow = 'visible';
    document.getElementById('root').setAttribute('aria-hidden', 'false');

    setGlobalState(beforeState => {
      const { modal } = beforeState;
      return {
        ...beforeState,
        modal: { ...modal, isOpened: false, isEditingTitle: false, isEditingDescription: false },
      };
    });
  },

  activeIsEditingTitle() {
    setGlobalState(beforeState => {
      const { modal } = beforeState;
      return { ...beforeState, modal: { ...modal, isEditingTitle: true } };
    });
  },

  inactiveIsEditingTitle() {
    setGlobalState(beforeState => {
      const { modal } = beforeState;
      return { ...beforeState, modal: { ...modal, isEditingTitle: false } };
    });
  },

  activeIsEditingDescription() {
    setGlobalState(beforeState => {
      const { modal } = beforeState;
      return { ...beforeState, modal: { ...modal, isEditingDescription: true } };
    });
  },

  inactiveIsEditingDescription() {
    setGlobalState(beforeState => {
      const { modal } = beforeState;
      return { ...beforeState, modal: { ...modal, isEditingDescription: false } };
    });
  },
};

export { trello, list, card, modal };
