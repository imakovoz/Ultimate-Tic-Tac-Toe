document.addEventListener("DOMContentLoaded", function(event) {
  const gameHook = document.querySelector("#game");
  let board = null;
  let box = null;
  for (var i = 1; i < 10; i++) {
    board = document.createElement("div");
    board.id = "board" + i;
    board.className = "board";
    for (var j = 1; j < 10; j++) {
      box = document.createElement("div");
      box.id = "box" + ((i - 1) * 9 + j);
      box.className = "box";
      board.innerHTML += box.outerHTML;
    }
    gameHook.innerHTML += board.outerHTML;
  }
});
