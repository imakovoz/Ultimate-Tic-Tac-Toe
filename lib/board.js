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
