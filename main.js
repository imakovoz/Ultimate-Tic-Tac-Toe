const Game = require("./lib/game.js");
const CPU = require("./lib/CPU1.js");

document.addEventListener("DOMContentLoaded", function(event) {
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
  $("body").data("count", 0);
  $("body").data("data", { data: [] });
  for (var i = 0; i < 200; i++) {
    console.log(i);
    setupBoard();
    var player2 = document.querySelector("#player2").selectedOptions[0]
      .textContent;
    let game = new Game(player2);
    $("#game").data("game", game);
    $("body").data("count", $("body").data("count") + 1);
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
    document
      .querySelector("#box" + (Math.floor(Math.random() * 81) + 1) + " > img")
      .click();
  }
  download("data.json", JSON.stringify($("body").data("data")));
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
      if (cpu.bestMove !== null) {
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
      }
    } else {
      if (gameJS.player === "X") {
        if (
          document.querySelector(
            "#box" + e.path[1].id.substring(3) + "> img"
          ) !== null
        ) {
          document.querySelector(
            "#box" + e.path[1].id.substring(3) + "> img"
          ).src =
            "./assets/O.png";
        }
      } else {
        if (
          document.querySelector(
            "#box" + e.path[1].id.substring(3) + "> img"
          ) !== null
        ) {
          document.querySelector(
            "#box" + e.path[1].id.substring(3) + "> img"
          ).src =
            "./assets/X.png";
        }
      }
    }
    if (gameJS.won()) {
      // console.log("Game Over");
      // alert("Game Over");
    } else {
      const move = gameJS.availableMoves()[
        Math.floor(Math.random() * gameJS.availableMoves().length)
      ];

      var arr = [];
      gameJS.availableMoves().forEach(i => {
        boardEl = document.querySelector("#board" + (i + 1));
        boardEl.className = "board active";
        let boxEl = null;
        for (var j = 1; j < 10; j++) {
          boxEl = document.querySelector("#box" + (i * 9 + j));
          if (boxEl.className !== "box-filled") {
            if (move === i) {
              arr.push(j);
            }
            document.querySelector("#box" + (i * 9 + j) + " > img").src =
              "./assets/" + gameJS.player + ".png";
          }
          boxEl.addEventListener("click", e => makeMove(e));
        }
      });
      document
        .querySelector(
          "#box" +
            (move * 9 + arr[Math.floor(Math.random() * arr.length)]) +
            " > img"
        )
        .click();
    }
  }

  function saveText(text, filename) {
    var a = document.createElement("a");
    a.setAttribute(
      "href",
      "data:text/plain;charset=utf-u," + encodeURIComponent(text)
    );
    a.setAttribute("download", filename);
    a.click();
  }
}
