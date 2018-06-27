class Board {
  constructor() {
    this.board = [null, null, null, null, null, null, null, null, null];
  }

  makeMove(player, position) {
    this.board[position - 1] = player;
  }

  won() {
    if (
      ((this.board[0] === this.board[4]) === this.board[8] &&
        this.board[4] !== null) ||
      ((this.board[1] === this.board[4]) === this.board[7] &&
        this.board[4] !== null) ||
      ((this.board[2] === this.board[4]) === this.board[6] &&
        this.board[4] !== null) ||
      ((this.board[3] === this.board[4]) === this.board[5] &&
        this.board[4] !== null)
    ) {
      return this.board[4];
    } else if (
      ((this.board[6] === this.board[7]) === this.board[8] &&
        this.board[6] !== null) ||
      ((this.board[0] === this.board[3]) === this.board[6] &&
        this.board[6] !== null)
    ) {
      return this.board[6];
    } else if (
      ((this.board[2] === this.board[5]) === this.board[8] &&
        this.board[0] !== null) ||
      ((this.board[0] === this.board[1]) === this.board[2] &&
        this.board[2] !== null)
    ) {
      return this.board[0];
    } else if (this.board.includes(null) === false) {
      return "draw";
    } else {
      return false;
    }
  }
}

module.exports = Board;
