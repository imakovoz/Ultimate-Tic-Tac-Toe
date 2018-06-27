const winArr = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]
];

class CPU {
  constructor(game) {
    this.initGame = Object.assign({}, game);
    // console.log(this.initGame.game[0]);
    this.availableGameMoves().forEach(poss => {
      console.log(this.scoreBoard(this.initGame.game[poss]));
    });
  }

  availableGameMoves() {
    if (this.boardWon(this.initGame.game[this.initGame.lastMove]) === false) {
      return [this.initGame.lastMove];
    } else {
      let arr = [];
      this.initGame.game.forEach((board, i) => {
        if (this.boardWon(board) === false) {
          arr.push(i);
        }
      });
      return arr;
    }
  }

  availableBoardMoves(board) {
    const brd = board.board;
    let arr = [];
    brd.forEach((el, i) => {
      if (Number.isInteger(el) === true) {
        arr.push(i);
      }
    });
    return arr;
  }

  scoreBoard(board) {
    const brd = board.board;
    const mvs = this.availableBoardMoves(board);
    let scoreObj = {};
    console.log(brd);
    mvs.forEach(move => {
      let scoreO = 0;
      let scoreX = 0;
      winArr.forEach((win, j) => {
        let xCount = 0;
        let oCount = 0;
        win.forEach(i => {
          if (brd[i] === "X") {
            xCount += 1;
          } else if (brd[i] === "O" || i === move) {
            // console.log("test");
            oCount += 1;
          }
        });
        if (xCount === 1 && oCount === 0) {
          scoreX += 1;
        } else if (xCount === 2 && oCount === 0) {
          scoreX += 3;
        } else if (xCount === 0 && oCount === 1) {
          scoreO += 1;
        } else if (xCount === 0 && oCount === 2) {
          scoreO += 3;
        } else if (xCount === 0 && oCount === 3) {
          scoreO += 20;
        }
      });
      scoreObj[move] = scoreO - scoreX;
    });
    console.log(scoreObj);
    return Object.keys(scoreObj).reduce(
      (a, b) => (scoreObj[a] > scoreObj[b] ? a : b)
    );
  }

  boardWon(board) {
    const brd = board.board;
    if (
      (brd[0] === brd[4] && brd[4] === brd[8]) ||
      (brd[1] === brd[4] && brd[4] === brd[7]) ||
      (brd[2] === brd[4] && brd[4] === brd[6]) ||
      (brd[3] === brd[4] && brd[4] === brd[5])
    ) {
      return brd[4];
    } else if (
      (brd[6] === brd[7] && brd[6] === brd[8]) ||
      (brd[0] === brd[3] && brd[0] === brd[6])
    ) {
      return brd[6];
    } else if (
      (brd[2] === brd[5] && brd[2] === brd[8]) ||
      (brd[0] === brd[1] && brd[0] === brd[2])
    ) {
      return brd[2];
    } else if (
      brd.join("").replace(/[0-9]/g, "").length === brd.join("").length
    ) {
      return "draw";
    } else {
      return false;
    }
  }
}

module.exports = CPU;
