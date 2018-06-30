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
    this.moves = this.getGameMoves(game);
    this.moveScores = {};
    this.bestMove = null;
    this.bestScore = null;
    this.moves.slice(0, 5).forEach((move, x) => {
      let [evalScore, evalMoves, evalGame] = this.dupeMove(game, move);
      let moveScore = 0;
      if (evalScore === "won") {
        moveScore = 100;
      } else {
        evalMoves
          .slice(evalMoves.length - 5, evalMoves.length)
          .forEach(eMove => {
            let [eScore, eMoves, eGame] = this.dupMove(evalGame, eMove);
            if (eScore === "won") {
              moveScore = -100;
            } else {
              eMoves.slice(0, 5).forEach(eMove1 => {
                [eScore, eMoves, eGame] = this.dupMove(eGame, eMove1);
                if (eScore > moveScore) {
                  moveScore = eScore;
                }
              });
            }
          });
      }
      if (moveScore > this.bestScore || this.bestMove === null) {
        this.bestMove = move.key;
        this.bestScore = moveScore;
      }
    });
  }

  dupMove(game, move) {
    let evalGame = JSON.parse(JSON.stringify(game));
    evalGame.game[move.key[0]].board[move.key[1]] = evalGame.player;
    if (evalGame.player === "O") {
      evalGame.player = "X";
    } else {
      evalGame.player = "O";
    }
    evalGame.lastMove = move.key[1];
    let evalScore = this.scoreGame(evalGame);
    let evalMoves = this.getGameMoves(evalGame);
    return [evalScore, evalMoves, evalGame];
  }

  dupeMove(game, move) {
    let evalGame = JSON.parse(JSON.stringify(game));
    evalGame.game[move.key[0]].board[move.key[1]] = evalGame.player;
    if (this.boardWon(evalGame.game[move.key[0]])) {
      return ["won", "the", "board"];
    } else {
      if (evalGame.player === "O") {
        evalGame.player = "X";
      } else {
        evalGame.player = "O";
      }
      evalGame.lastMove = move.key[1];
      let evalScore = this.scoreGame(evalGame);
      let evalMoves = this.getGameMoves(evalGame);
      return [evalScore, evalMoves, evalGame];
    }
  }

  getGameMoves(game) {
    let moves = [];
    this.availableGameMoves(game).forEach(poss => {
      let scoreObj = this.scoreBoard(game.game[poss], game.player);
      moves = moves.concat(
        Object.keys(scoreObj).map(key => {
          return { key: [poss, parseInt(key)], value: scoreObj[key] };
        })
      );
    });
    moves.sort(function(p1, p2) {
      return p2.value - p1.value;
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

  scoreGame(game) {
    let boards = [];
    game.game.forEach(board => {
      boards.push(this.evalBoard(board, game.player) / 16);
    });
    return this.evalGame(boards);
  }

  evalGame(boards) {
    let scoreO = 0;
    let scoreX = 0;
    let scoreCount = 0;
    winArr.forEach((win, j) => {
      let xCount = 0;
      let oCount = 0;
      let multiplierX = 0;
      let multiplierO = 0;
      win.forEach(i => {
        if (boards[i] === 1) {
          multiplierO = 5;
        } else if (boards[i] === -1) {
          multiplierX = 5;
        } else if (boards[i] < 0) {
          multiplierX += boards[i];
          xCount += 1;
        } else if (boards[i] > 0) {
          multiplierO += boards[i];
          oCount += 1;
        }
      });
      if (multiplierO > 4 || multiplierX > 4) {
        scoreX = 0;
        scoreO = 0;
      } else if (multiplierO > 4) {
        scoreX = 0;
      } else if (multiplierX > 4) {
        scoreO = 0;
      } else if (xCount === 1 && oCount === 0) {
        scoreX += 1 * multiplierX;
      } else if (xCount === 2 && oCount === 0) {
        scoreX += 3 * multiplierX / 2;
      } else if (xCount === 3 && oCount === 0) {
        scoreX += 16 * multiplierX / 3;
      } else if (xCount === 0 && oCount === 1) {
        scoreO += 1 * multiplierO;
      } else if (xCount === 0 && oCount === 2) {
        scoreO += 3 * multiplierO / 2;
      } else if (xCount === 0 && oCount === 3) {
        scoreO += 16 * multiplierO / 3;
      } else if (xCount === 1 && oCount === 1) {
        scoreO += 1 * multiplierO;
        scoreX += 1 * multiplierX;
      } else if (xCount === 1 && oCount === 2) {
        scoreO += 3 * multiplierO / 2;
        scoreX += 1 * multiplierX;
      } else if (xCount === 1 && oCount === 3) {
        scoreO += 16 * multiplierO / 3;
        scoreX += 1 * multiplierX;
      } else if (xCount === 2 && oCount === 1) {
        scoreO += 1 * multiplierO;
        scoreX += 3 * multiplierX / 2;
      } else if (xCount === 3 && oCount === 1) {
        scoreO += 1 * multiplierO;
        scoreX += 16 * multiplierX / 3;
      }
    });
    scoreCount = scoreO + scoreX;
    return scoreCount;
  }

  evalBoard(board) {
    const brd = board.board;
    let scoreO = 0;
    let scoreX = 0;
    let scoreCount = 0;
    winArr.forEach((win, j) => {
      let xCount = 0;
      let oCount = 0;
      win.forEach(i => {
        if (brd[i] === "X") {
          xCount += 1;
        } else if (brd[i] === "O") {
          oCount += 1;
        }
      });
      if (xCount === 1 && oCount === 0) {
        scoreX += 1;
      } else if (xCount === 2 && oCount === 0) {
        scoreX += 3;
      } else if (xCount === 3 && oCount === 0) {
        scoreX += 1600;
      } else if (xCount === 0 && oCount === 1) {
        scoreO += 1;
      } else if (xCount === 0 && oCount === 2) {
        scoreO += 3;
      } else if (xCount === 0 && oCount === 3) {
        scoreO += 1600;
      }
    });
    if (scoreO > 1000) {
      scoreCount = 16;
    } else if (scoreX > 1000) {
      scoreCount = -16;
    } else {
      scoreCount = parseFloat(scoreO) - parseFloat(scoreX);
    }
    return scoreCount;
  }

  scoreBoard(board, player) {
    const brd = board.board;
    const mvs = this.availableBoardMoves(board);
    let scoreObj = {};
    mvs.some(move => {
      let scoreO = 0;
      let scoreX = 0;
      winArr.forEach((win, j) => {
        let xCount = 0;
        let oCount = 0;
        win.forEach(i => {
          if (brd[i] === "X") {
            xCount += 1;
          } else if (brd[i] === "O") {
            oCount += 1;
          } else if (i === move) {
            if (player === "O") {
              oCount += 1;
            } else {
              xCount += 1;
            }
          }
        });
        if (xCount === 1 && oCount === 0) {
          scoreX += 1;
        } else if (xCount === 2 && oCount === 0) {
          scoreX += 3;
        } else if (xCount === 3 && oCount === 0) {
          scoreX = 16;
          scoreO = 0;
          if (player === "O") {
            scoreObj[move] = scoreO - scoreX;
          } else {
            scoreObj[move] = scoreX - scoreO;
          }
          return true;
        } else if (xCount === 0 && oCount === 1) {
          scoreO += 1;
        } else if (xCount === 0 && oCount === 2) {
          scoreO += 3;
        } else if (xCount === 0 && oCount === 3) {
          scoreO = 16;
          scoreX = 0;
          if (player === "O") {
            scoreObj[move] = scoreO - scoreX;
          } else {
            scoreObj[move] = scoreX - scoreO;
          }
          return true;
        }
      });
      if (player === "O") {
        scoreObj[move] = scoreO - scoreX;
      } else {
        scoreObj[move] = scoreX - scoreO;
      }
    });
    return scoreObj;
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
