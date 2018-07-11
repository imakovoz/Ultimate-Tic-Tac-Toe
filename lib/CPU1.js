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
    this.game = game;
    this.moves = this.availableMoves(game);
    this.bestMove = null;
    this.bestScore = Number.MAX_SAFE_INTEGER * -1;
    if (this.moves.length > 20) {
      this.moves = this.moves.sort((a, b) => {
        return b[0] - a[0];
      });
      this.moves = this.moves.slice(0, 20);
    }
    this.moves.forEach(move => {
      let evalGame = this.dupMove(game, move);
      let arr2 = [];
      if (evalGame[1].length > 20) {
        evalGame[1] = evalGame[1].sort((a, b) => {
          return b[0] - a[0];
        });
        evalGame[1] = evalGame[1].slice(0, 20);
      }
      evalGame[1].forEach(newMove => {
        let eGame = this.dupMove(evalGame[2], newMove);
        let arr1 = [];
        // write if opponent wins to break early
        eGame[1].forEach(nMove => {
          let eGame1 = this.dupMove(evalGame[2], newMove);
          let arr = [];
          eGame1[1].forEach(nMove1 => {
            arr.push(this.dupMove(eGame1[2], nMove1));
          });
          arr = arr.sort((a, b) => {
            return a[0] - b[0];
          });
          // console.log(arr);
          arr1.push(arr[0][0]);
          // arr[0] represents best move for CPU after x moves
        });
        arr1 = arr1.sort((a, b) => {
          return a - b;
        });
        arr2.push(arr1[0]);
      });
      arr2 = arr2.sort((a, b) => {
        return a - b;
      });
      console.log(arr2);
      if (arr2[0] > this.bestScore) {
        this.bestScore = arr2[0];
        this.bestMove = move;
      }
      // check if better than current best
    });
    console.log(this.bestScore);
  }

  dupMove(game, move) {
    let evalGame = JSON.parse(JSON.stringify(game));
    evalGame.game[move[0]].board[move[1]] = evalGame.player;
    if (evalGame.player === "O") {
      evalGame.player = "X";
    } else {
      evalGame.player = "O";
    }
    evalGame.lastMove = move[1];
    let evalScore = this.scoreGame(evalGame);
    let evalMoves = this.availableMoves(evalGame);
    return [evalScore, evalMoves, evalGame, move];
  }

  scoreGame(game) {
    // debugger;
    const brds = game.game;
    let xScore = 0;
    let oScore = 0;
    for (var i = 0; i < winArr.length; i++) {
      let xCount = 0;
      let oCount = 0;
      let xWin = 0;
      let oWin = 0;
      winArr[i].forEach(pos => {
        const score = this.scoreBoard(brds[pos].board);

        if (score < 0) {
          xCount += score / -16;
          if (score === -1) {
            xCount += 1;
            xWin += 1;
          }
        } else if (score > 0) {
          oCount += score / 16;
          if (score === 1) {
            oCount += 1;
            oWin += 1;
          }
        }
      });
      if (xWin >= 1 && oWin >= 1) {
        break;
      } else if (xWin === 3) {
        xScore = 100;
        oScore = 0;
        break;
      } else if (oWin === 3) {
        oScore = 100;
        xScore = 0;
        break;
      } else if (oCount >= xCount) {
        oScore += oCount - xCount;
      } else if (oCount < xCount) {
        xScore += xCount - oCount;
      }
    }
    return oScore - xScore;
  }

  scoreBoard(board) {
    let xScore = 0;
    let oScore = 0;
    for (var i = 0; i < winArr.length; i++) {
      let xCount = 0;
      let oCount = 0;
      winArr[i].forEach(pos => {
        if (board[pos] === "X") {
          xCount += 1;
        } else if (board[pos] === "O") {
          oCount += 1;
        }
      });
      if (xCount === 1 && oCount === 0) {
        xScore += 1;
      } else if (xCount === 2 && oCount === 0) {
        xScore += 3;
      } else if (xCount === 3 && oCount === 0) {
        xScore = 16;
        oScore = 0;
        break;
      } else if (oCount === 1 && xCount === 0) {
        oScore += 1;
      } else if (oCount === 2 && xCount === 0) {
        oScore += 3;
      } else if (oCount === 3 && xCount === 0) {
        oScore = 16;
        xScore = 0;
        break;
      }
    }
    return oScore - xScore;
  }

  availableMoves(game) {
    let moves = [];
    this.availableGameMoves(game).forEach(board => {
      let x = this.availableBoardMoves(game.game[board]).map(el => {
        return [board, el];
      });
      moves = moves.concat(x);
    });
    return moves;
  }

  availableGameMoves(game) {
    if (this.boardWon(game.game[game.lastMove]) === false) {
      return [game.lastMove];
    } else {
      let arr = [];
      game.game.forEach((board, i) => {
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
