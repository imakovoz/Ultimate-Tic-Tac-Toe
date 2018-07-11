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

/***/ "./lib/CPU1.js":
/*!*********************!*\
  !*** ./lib/CPU1.js ***!
  \*********************/
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


/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./lib/game.js */ "./lib/game.js");
const CPU = __webpack_require__(/*! ./lib/CPU1.js */ "./lib/CPU1.js");

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
    let test = gameJS.makeMove(Math.floor(moveI), moveJ);
    document.querySelectorAll(".box").forEach(box => {
      var new_element = box.cloneNode(true);
      box.parentNode.replaceChild(new_element, box);
    });
    const moveBox = document.querySelector("#box" + e.path[1].id.substring(3));
    moveBox.className = "box-filled";
    document.querySelectorAll(".active").forEach((active, i) => {
      active.className = "board";
    });
    if (test === "won") {
      let wonEl = document.createElement("img");
      if (gameJS.player === "X") {
        wonEl.src = "./assets/O.png";
      } else {
        wonEl.src = "./assets/X.png";
      }
      document.querySelector("#board" + (Math.floor(moveI) + 1)).innerHTML =
        wonEl.outerHTML;
    }
    if (
      gameJS.opponent === "CPU" &&
      gameJS.player === "O" &&
      gameJS.won() === false
    ) {
      if (gameJS.lastCPU !== null) {
        document.querySelectorAll("#box" + gameJS.lastCPU).forEach(el => {
          el.style.backgroundColor = "inherit";
        });
      }
      // download("game.json", JSON.stringify(gameJS));
      let cpu = new CPU(gameJS);
      let test1 = gameJS.makeMove(cpu.bestMove[0], cpu.bestMove[1] + 1);
      document.querySelector(
        "#box" + (cpu.bestMove[0] * 9 + cpu.bestMove[1] + 1)
      ).className =
        "box-filled";
      document.querySelector(
        "#box" + (cpu.bestMove[0] * 9 + cpu.bestMove[1] + 1)
      ).style.backgroundColor =
        "#709fb0";
      document.querySelector(
        "#box" + (cpu.bestMove[0] * 9 + cpu.bestMove[1] + 1) + " > img"
      ).src =
        "./assets/O.png";
      gameJS.lastCPU = cpu.bestMove[0] * 9 + cpu.bestMove[1] + 1;
      if (test1 === "won") {
        let wonEl = document.createElement("img");
        wonEl.src = "./assets/O.png";
        wonEl.height = "100";
        wonEl.width = "100";
        document.querySelector("#board" + (cpu.bestMove[0] + 1)).innerHTML =
          wonEl.outerHTML;
      }
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
    if (gameJS.won()) {
      alert("Game Over");
    } else {
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

  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map