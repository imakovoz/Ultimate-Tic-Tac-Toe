const Game = require("./lib/game.js");
const CPU = require("./lib/CPU.js");

document.addEventListener("DOMContentLoaded", function(event) {
  setupBoard();
  document.querySelector("#start-button").addEventListener("click", e => {
    setupBoard();
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
    let cpu = new CPU(gameJS);
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
