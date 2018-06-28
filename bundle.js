/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/CPU.js":
/*!********************!*\
  !*** ./lib/CPU.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

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
      let [evalScore, evalMoves, evalGame] = this.dupMove(game, move);
      let moveScore = 0;
      evalMoves.slice(0, 1).forEach(eMove => {
        let [eScore, eMoves, eGame] = this.dupMove(evalGame, eMove);
        [eScore, eMoves, eGame] = this.dupMove(eGame, eMoves[0]);
        console.log(eScore);
        console.log(eGame);
        moveScore += eScore;
      });
      if (moveScore > this.bestScore || this.bestMove === null) {
        this.bestMove = move.key;
        this.bestScore = moveScore;
      }
    });
    console.log(this.bestScore);
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
    // console.log(boards);
    return this.evalGame(boards);
  }

  evalGame(boards) {
    let scoreO = 0;
    let scoreX = 0;
    let scoreCount = 0;
    winArr.forEach((win, j) => {
      let xCount = 0;
      let oCount = 0;
      let multiplier = 0;
      win.forEach(i => {
        multiplier += boards[i];
        if (boards[i] < 0) {
          xCount += 1;
        } else if (boards[i] > 0) {
          oCount += 1;
        }
      });
      multiplier /= 3;
      if (xCount === 1 && oCount === 0) {
        scoreX += 1 * multiplier;
      } else if (xCount === 2 && oCount === 0) {
        scoreX += 3 * multiplier;
      } else if (xCount === 3 && oCount === 0) {
        scoreX += 16 * multiplier;
      } else if (xCount === 0 && oCount === 1) {
        scoreO += 1 * multiplier;
      } else if (xCount === 0 && oCount === 2) {
        scoreO += 3 * multiplier;
      } else if (xCount === 0 && oCount === 3) {
        scoreO += 16 * multiplier;
      }
    });
    scoreCount = scoreO - scoreX;
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
    });
    if (scoreO > 1000) {
      scoreCount = 16;
    } else if (scoreX > 1000) {
      scoreCount = -16;
    } else {
      scoreCount = scoreO - scoreX;
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


/***/ }),

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Board {
  constructor() {
    this.board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  board() {
    return this.board;
  }

  makeMove(player, position) {
    this.board[position - 1] = player;
  }

  won() {
    if (
      (this.board[0] === this.board[4] && this.board[4] === this.board[8]) ||
      (this.board[1] === this.board[4] && this.board[4] === this.board[7]) ||
      (this.board[2] === this.board[4] && this.board[4] === this.board[6]) ||
      (this.board[3] === this.board[4] && this.board[4] === this.board[5])
    ) {
      return this.board[4];
    } else if (
      (this.board[6] === this.board[7] && this.board[6] === this.board[8]) ||
      (this.board[0] === this.board[3] && this.board[0] === this.board[6])
    ) {
      return this.board[6];
    } else if (
      (this.board[2] === this.board[5] && this.board[2] === this.board[8]) ||
      (this.board[0] === this.board[1] && this.board[0] === this.board[2])
    ) {
      return this.board[2];
    } else if (
      this.board.join("").replace(/[0-9]/g, "").length ===
      this.board.join("").length
    ) {
      return "draw";
    } else {
      return false;
    }
  }
}

module.exports = Board;


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(/*! ./board.js */ "./lib/board.js");

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
    this.game[i].makeMove(this.player, j);

    if (this.player === "X") {
      this.player = "O";
    } else {
      this.player = "X";
    }
    this.lastMove = j - 1;
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


/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./lib/game.js */ "./lib/game.js");
const CPU = __webpack_require__(/*! ./lib/CPU.js */ "./lib/CPU.js");

document.addEventListener("DOMContentLoaded", function(event) {
  setupBoard();
  document.querySelector("#start-button").addEventListener("click", e => {
    setupBoard();
    var player2 = document.querySelector("#player2").selectedOptions[0]
      .textContent;
    let game = new Game(player2);
    $("#game").data("game", game);
    let boardEl = "null";
    game.availableMoves().forEach(i => {
      boardEl = document.querySelector("#board" + (i + 1));
      boardEl.className = "board active";
      let boxEl = null;
      for (var j = 1; j < 10; j++) {
        boxEl = document.querySelector("#box" + (i * 9 + j));
        boxEl.addEventListener("click", e => makeMove(e));
      }
    });
  });
});

function setupBoard() {
  const gameHook = document.querySelector("#game");
  let board = null;
  let box = null;
  let div = null;
  for (var i = 1; i < 10; i++) {
    board = document.createElement("div");
    board.id = "board" + i;
    board.className = "board";
    for (var j = 1; j < 10; j++) {
      box = document.createElement("div");
      div = document.createElement("img");
      box.id = "box" + ((i - 1) * 9 + j);
      box.className = "box";
      div.src = "./assets/X.png";
      box.innerHTML += div.outerHTML;
      board.innerHTML += box.outerHTML;
    }
    if (i === 1) {
      gameHook.innerHTML = board.outerHTML;
    } else {
      gameHook.innerHTML += board.outerHTML;
    }
  }
}
function makeMove(e) {
  const gameJS = $("#game").data("game");
  let moveI = e.path[1].id.substring(3) / 9;
  let moveJ = e.path[1].id.substring(3) % 9;
  if (moveJ === 0) {
    moveJ = 9;
    moveI -= 1;
  }
  if (gameJS.validMove(Math.floor(moveI), moveJ)) {
    gameJS.makeMove(Math.floor(moveI), moveJ);
    document.querySelectorAll(".box").forEach(box => {
      var new_element = box.cloneNode(true);
      box.parentNode.replaceChild(new_element, box);
    });
    const moveBox = document.querySelector("#box" + e.path[1].id.substring(3));
    moveBox.className = "box-filled";
    if (gameJS.won()) {
      alert("won");
    }
    document.querySelectorAll(".active").forEach((active, i) => {
      active.className = "board";
    });
    if (gameJS.opponent === "CPU" && gameJS.player === "O") {
      let cpu = new CPU(gameJS);
      gameJS.makeMove(cpu.bestMove[0], cpu.bestMove[1] + 1);
      document.querySelector(
        "#box" + (cpu.bestMove[0] * 9 + cpu.bestMove[1] + 1)
      ).className =
        "box-filled";
      document.querySelector(
        "#box" + (cpu.bestMove[0] * 9 + cpu.bestMove[1] + 1) + " > img"
      ).src =
        "./assets/O.png";
    } else {
      if (gameJS.player === "X") {
        document.querySelector(
          "#box" + e.path[1].id.substring(3) + "> img"
        ).src =
          "./assets/O.png";
      } else {
        document.querySelector(
          "#box" + e.path[1].id.substring(3) + "> img"
        ).src =
          "./assets/X.png";
      }
    }
    gameJS.availableMoves().forEach(i => {
      boardEl = document.querySelector("#board" + (i + 1));
      boardEl.className = "board active";
      let boxEl = null;
      for (var j = 1; j < 10; j++) {
        boxEl = document.querySelector("#box" + (i * 9 + j));
        if (boxEl.className !== "box-filled") {
          document.querySelector("#box" + (i * 9 + j) + " > img").src =
            "./assets/" + gameJS.player + ".png";
        }
        boxEl.addEventListener("click", e => makeMove(e));
      }
    });
  }
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map