
const Player = (name, symbol) => {
  return {name, symbol};
};

const gameBoard = (function() {
  'use strict';

  const DEFAULT_BOARD =  [["", "", ""],
                          ["", "", ""],
                          ["", "", ""]];

  let board = [["", "", ""],
  ["", "", ""],
  ["", "", ""]];

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = ""
      }
    }
  }

  const id_to_coordinate = () => [[0, 0], [0, 1], [0, 2],
                                  [1, 0], [1, 1], [1, 2],
                                  [2, 0], [2, 1], [2, 2]];


  const updateBoard = (pos, symbol) => {

    const x = id_to_coordinate()[pos][0];
    const y = id_to_coordinate()[pos][1];
    console.log([x, y])

    board[x][y] = symbol;
  }

  const isEmptyCell = (id) => {
    const x = id_to_coordinate()[id][0];
    const y = id_to_coordinate()[id][1];

    return board[x][y] == "" ? true : false;
  }

  return {board, DEFAULT_BOARD, updateBoard, isEmptyCell};

})();

const renderBoard = (function() {
  'use strict';
  let index = 0;
  const board = gameBoard.board;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = document.getElementById(`${index}`);
      cell.textContent = board[i][j];
      index++;
    }
  };
});

const game = (function() {
  'use strict';

  const SIDE = 3;

  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');

  let current_player = player1;
  let other_player = player2;

  const swap_turns = () => {
    [current_player, other_player] = [other_player, current_player]
  };
  
  // add onclick event to cells on board

  const simulateTurn = () => {
    const table = document.querySelector('table');
    table.onclick = function(event) {
   
      let td = event.target.closest('td');
      togglePlayerTurn(other_player);

      if (gameBoard.isEmptyCell(parseInt(td.id))) {
        console.log("a")
        updateBoard(parseInt(td.id), current_player.symbol)
      };
      swap_turns();
      renderBoard();
      if (gameOver(gameBoard.board)) {
        table.onclick = '';
        gameOverMessage(other_player);
      }
    }
  }

  const togglePlayerTurn = (player) => {
    const message = document.getElementById('turn');
    message.textContent = `${player.name}'s turn `
  }


  const gameOver = (board) => {
    return(rowCrossed(board) || columnCrossed(board) || diagonalCrossed(board) ); 
  }

  const rowCrossed = (board) => {
    for (let i=0; i<SIDE; i++) { 
        if (board[i][0] == board[i][1] && 
            board[i][1] == board[i][2] &&  
            board[i][0] != '')
            return true; 
    } 
    return false; 
  }

  const columnCrossed = (board) => {
    for (let i=0; i<SIDE; i++) { 
        if (board[0][i] == board[1][i] && 
            board[1][i] == board[2][i] &&  
            board[0][i] != '') 
            return true; 
    } 
    return false; 
  }

  const diagonalCrossed = (board) => {
    if (board[0][0] == board[1][1] && 
        board[1][1] == board[2][2] &&  
        board[0][0] != '') {
          return true; 
    } else if (board[0][2] == board[1][1] && 
              board[1][1] == board[2][0] && 
              board[0][2] != '') {
          return true;
    }
    return false;
  }

  const gameOverMessage = (player) => {
    const message = document.getElementById('messages')
    const winner = document.createElement('p');
    const resetBtn = document.createElement('button');

    message.appendChild(winner);
    message.appendChild(resetBtn);

    winner.textContent = `${player.name} wins!`;
    resetBtn.textContent = 'Play again';
    
    resetBtn.onclick = function(e) {
      resetGame();
    }
  }


  const endGame = () => {
    console.log(`${current_player.name}`)
  }



  const updateBoard = (id, symbol) => {
    gameBoard.updateBoard(id, symbol)
  };

  const resetGame = () => {
    location.reload()
  }

  const play = () => {
    simulateTurn();
  }

  return {play}

})();

game.play();