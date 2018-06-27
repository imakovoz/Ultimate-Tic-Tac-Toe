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

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Board {
  constructor() {
    this.board = [null, null, null, null, null, null, null, null, null];
  }

  board() {
    return this.board;
  }

  makeMove(player, position) {
    this.board[position - 1] = player;
  }

  won() {
    let response = false;
    if (
      (this.board[0] === this.board[4] &&
        this.board[4] === this.board[8] &&
        this.board[4] !== null) ||
      (this.board[1] === this.board[4] &&
        this.board[4] === this.board[7] &&
        this.board[4] !== null) ||
      (this.board[2] === this.board[4] &&
        this.board[4] === this.board[6] &&
        this.board[4] !== null) ||
      (this.board[3] === this.board[4] &&
        this.board[4] === this.board[5] &&
        this.board[4] !== null)
    ) {
      response = this.board[4];
    } else if (
      (this.board[6] === this.board[7] &&
        this.board[6] === this.board[8] &&
        this.board[6] !== null) ||
      (this.board[0] === this.board[3] &&
        this.board[0] === this.board[6] &&
        this.board[6] !== null)
    ) {
      response = this.board[6];
    } else if (
      (this.board[2] === this.board[5] &&
        this.board[2] === this.board[8] &&
        this.board[2] !== null) ||
      (this.board[0] === this.board[1] &&
        this.board[0] === this.board[2] &&
        this.board[2] !== null)
    ) {
      response = this.board[0];
    } else if (this.board.includes(null) === false) {
      response = "draw";
    } else {
      response = false;
    }
    console.log(this.board[2]);
    console.log(this.board[5]);
    console.log(this.board[8]);
    // console.log((this.board[2] === this.board[5]) === this.board[8]);
    console.log(response);
    return response;
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

  validMove(i, j) {
    if (this.game[i].board[j - 1]) {
      return false;
    }
    return true;
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


/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./lib/game.js */ "./lib/game.js");

document.addEventListener("DOMContentLoaded", function(event) {
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
    gameHook.innerHTML += board.outerHTML;
  }
  document.querySelector("#start-button").addEventListener("click", e => {
    let game = new Game();
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
    if (gameJS.player === "X") {
      document.querySelector("#box" + e.path[1].id.substring(3) + "> img").src =
        "./assets/O.png";
    } else {
      document.querySelector("#box" + e.path[1].id.substring(3) + "> img").src =
        "./assets/X.png";
    }
    document.querySelectorAll(".active").forEach((active, i) => {
      active.className = "board";
    });
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