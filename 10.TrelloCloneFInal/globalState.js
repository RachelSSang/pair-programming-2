import render from './library/dom/render.js';

// TODO: board -> list로 통일

// eslint-disable-next-line import/no-mutable-exports
let globalState = {
  boards: [
    {
      id: 1,
      title: 'Tasks To Do',
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
  isAddingList: null,
};

// 다른 방법을 생각해보자..
globalState.isAddingList = globalState.boards.length === 0;

const setGlobalState = newState => {
  globalState = { ...globalState, ...newState };
  render();
};

const trello = {
  toggleIsAddingList() {
    const { isAddingList } = globalState;
    setGlobalState({ isAddingList: !isAddingList });
  },
};

const list = {
  // 새로운 id값 구하기
  getNewId() {
    return Math.max(...globalState.boards.map(({ id }) => id), 0) + 1;
  },

  // 리스트 추가
  add(newTitle) {
    const newList = {
      id: this.getNewId(),
      title: newTitle,
      cards: [],
      isEditingTitle: false,
      isAddingCard: false,
    };
    const newBoards = [...globalState.boards, newList];
    setGlobalState({ boards: newBoards });
  },

  // 리스트 삭제
  remove(targetId) {
    const newBoards = globalState.boards.filter(({ id }) => id !== targetId);
    setGlobalState({ boards: newBoards });
  },

  // 리스트 순서 변경
  // const changeListOrder = () => {

  // }

  // 리스트 타이틀 변경
  changeTitle(targetId, newTitle) {
    const newBoards = globalState.boards.map(board => (board.id === targetId ? { ...board, title: newTitle } : board));
    setGlobalState({ boards: newBoards });
  },

  // 리스트 isEditingTitle 상태 토글
  toggleIsEditingTitle(targetId) {
    const newBoards = globalState.boards.map(board =>
      board.id === targetId ? { ...board, isEditingTitle: !board.isEditingTitle } : board
    );
    setGlobalState({ boards: newBoards });
  },

  // 리스트 isAddingCard 상태 토글
  toggleIsAddingCard(targetId) {
    const newBoards = globalState.boards.map(board =>
      board.id === targetId ? { ...board, isAddingCard: !board.isAddingCard } : board
    );
    setGlobalState({ boards: newBoards });
  },
};

const card = {
  // 새로운 id값 구하기
  getNewId(targetListId) {
    const targetCards = globalState.boards.filter(({ id }) => id === targetListId)[0].cards;
    return Math.max(...targetCards.map(({ id }) => id), 0) + 1;
  },

  // 카드 추가
  add(targetListId, title) {
    const newCard = { id: this.getNewId(targetListId), title, description: '' };
    const newCards = [...globalState.boards.filter(({ id }) => id === targetListId)[0].cards, newCard];
    const newBoards = globalState.boards.map(board =>
      board.id === targetListId ? { ...board, cards: newCards } : board
    );
    setGlobalState({ boards: newBoards });
  },

  // 카드 삭제
  remove(targetListId, targetCardId) {
    const newCards = globalState.boards
      .filter(({ id }) => id === targetListId)[0]
      .cards.filter(({ id }) => id !== targetCardId);
    const newBoards = globalState.boards.map(board =>
      board.id === targetListId ? { ...board, cards: newCards } : board
    );
    setGlobalState({ boards: newBoards });
  },

  // 카드 순서 변경

  // 카드 타이틀 변경
  changeTitle(targetListId, targetCardId, newTitle) {
    const newCards = globalState.boards
      .filter(({ id }) => id === targetListId)[0]
      .cards.map(card => (card.id === targetCardId ? { ...card, title: newTitle } : card));
    const newBoards = globalState.boards.map(board =>
      board.id === targetListId ? { ...board, cards: newCards } : board
    );
    setGlobalState({ boards: newBoards });
  },

  // 카드 디스크립션 변경
  changeDescription(targetListId, targetCardId, newDescription) {
    const newCards = globalState.boards
      .filter(({ id }) => id === targetListId)[0]
      .cards.map(card => (card.id === targetCardId ? { ...card, description: newDescription } : card));
    const newBoards = globalState.boards.map(board =>
      board.id === targetListId ? { ...board, cards: newCards } : board
    );
    setGlobalState({ boards: newBoards });
  },
};

export { globalState, setGlobalState, trello, list, card };
