const Board = require("./board.js");

class Game {
  constructor(player2) {
    this.game = [];
    let board = null;
    for (var i = 0; i < 9; i++) {
      board = new Board();
      this.game.push(board);
    }
    this.lastMove = null;
    this.player = "X";
    this.opponent = player2;
    this.lastCPU = null;
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

  validMove(i, j) {
    // console.log(Number.isInteger("O"));
    if (Number.isInteger(this.game[i].board[j - 1]) === true) {
      return true;
    }
    return false;
  }

  makeMove(i, j) {
    const arr = [];
    const arr1 = [];
    this.game.forEach((board, i) => {
      board.board.forEach(el => {
        if (el === "X") {
          arr.push(-1);
        } else if (el === "O") {
          arr.push(1);
        } else {
          arr.push(0);
        }
        if (this.availableMoves().includes(i)) {
          if (el === "X" || el === "O") {
            arr1.push(0);
          } else {
            arr1.push(1);
          }
        } else {
          arr1.push(0);
        }
      });
    });
    $("body")
      .data("data")
      .data.push(arr.concat(arr1));
    console.log($("body").data("data"));
    this.game[i].makeMove(this.player, j);
    if (this.player === "X") {
      this.player = "O";
    } else {
      this.player = "X";
    }
    this.lastMove = j - 1;
    if (this.game[i].won() !== "draw" && this.game[i].won() !== false) {
      return "won";
    }
  }

  won() {
    if (
      (this.game[0].won() === this.game[1].won() &&
        this.game[0].won() === this.game[2].won() &&
        this.game[0].won() !== false) ||
      (this.game[0].won() === this.game[3].won() &&
        this.game[0].won() === this.game[6].won() &&
        this.game[0].won() !== false) ||
      (this.game[0].won() === this.game[4].won() &&
        this.game[0].won() === this.game[8].won() &&
        this.game[0].won() !== false) ||
      (this.game[1].won() === this.game[4].won() &&
        this.game[1].won() === this.game[7].won() &&
        this.game[1].won() !== false) ||
      (this.game[2].won() === this.game[5].won() &&
        this.game[8].won() === this.game[2].won() &&
        this.game[2].won() !== false) ||
      (this.game[3].won() === this.game[4].won() &&
        this.game[4].won() === this.game[5].won() &&
        this.game[3].won() !== false) ||
      (this.game[6].won() === this.game[7].won() &&
        this.game[6].won() === this.game[8].won() &&
        this.game[6].won() !== false)
    ) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Game;
