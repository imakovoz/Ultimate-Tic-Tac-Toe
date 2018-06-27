const Board = require("./board.js");

class Game {
  constructor() {
    this.game = [];
    let board = null;
    for (var i = 0; i < 9; i++) {
      board = new Board();
      this.game.push(board);
    }
    this.lastMove = null;
    this.player = "X";
  }

  availableMoves() {
    if (this.lastMove === null) {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }
    if (this.game[this.lastMove].won() === false) {
      return [this.lastMove];
    } else {
      let arr = [];
      this.game.forEach((board, i) => {
        if (board.won() === false) {
          arr.push(i);
        }
      });
      return arr;
    }
  }

  makeMove(i, j) {
    this.game[i].makeMove(this.player, j);
    if (this.player === "X") {
      this.player = "O";
    } else {
      this.player = "X";
    }
    this.lastMove = j - 1;
  }
}

module.exports = Game;
