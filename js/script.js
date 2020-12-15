const gameBoard = (function() {
  'use strict';

  let board = () => [["X", "O", "2"],
                     ["", "", "4"],
                     ["1", "", "5"]];

  return {board};

})();

const game = (function() {
  'use strict';
})

const Player = (name, symbol) => {
  return {name, symbol};
};

const renderBoard = (function() {
  'use strict';
  let index = 0;
  const board = gameBoard.board();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = document.getElementById(`${index}`)
      cell.textContent = board[i][j]
      index++
    }
  };
})

const render = renderBoard();