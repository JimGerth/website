class Gameboard {
  constructor(size, scale, board) {
    this.size = size;
    this.scale = scale;
    this.board = board;

    this.rows = 3 * (this.size - 1) + this.size;
    this.cols = 2 * this.size - 1;

    this.cells = [];
    for (let y = 0; y < this.rows; y++) {
      this.cells.push([]);
      for (let x = 0; x < this.cols; x++) {
        this.cells[y].push(null);
      }
    }

    this.setup();
  }

  setup() {
    this.setupBoard();
    this.setupNeighbours();
    $(`body`).html($(`body`).html());
    this.setupCallbacks();
    this.setupSize();
  }

  setupBoard() {
    let id = 0;
    let xCellOffset = this.scale * 1.5;
    let yCellOffset = this.scale * 0.86602540378;
    let xBoardOffset = this.scale;
    let yBoardOffset = 0.86602540378 * this.scale;
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (
          (
            (this.size % 2 == 0 && x % 2 != y % 2) ||
            (this.size % 2 != 0 && x % 2 == y % 2)
          ) && (
            (x + y >= this.size - 1) &&
            (this.cols - 1 - x + y >= this.size - 1) &&
            (x + this.rows - 1 - y >= this.size - 1 ) &&
            ( this.cols - 1 - x + this.rows - 1 - y >= this.size - 1)
          )
        ) {
          this.cells[y][x] = new Cell(
            id,
            this.board && this.board[id] ? this.board[id].free : true,
            this.board && this.board[id] ? this.board[id].constraint : null,
            x * xCellOffset + xBoardOffset, // this.scale = x board offset
            y * yCellOffset + yBoardOffset, // 0.86602540378 * this.scale = y board offset
            this.scale
          );
          id++;
        }
      }
    }
  }

  setupNeighbours() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.cells[y][x]){
          if (y - 2 >= 0) {
            this.cells[y][x].addNeighbour(direction.top, this.cells[y - 2][x]);
          }
          if (y - 1 >= 0 && x + 1 < this.cols) {
            this.cells[y][x].addNeighbour(direction.topright, this.cells[y - 1][x + 1]);
          }
          if (y + 1 < this.rows && x + 1 < this.cols) {
            this.cells[y][x].addNeighbour(direction.bottomright, this.cells[y + 1][x + 1]);
          }
          if (y + 2 < this.rows) {
            this.cells[y][x].addNeighbour(direction.bottom, this.cells[y + 2][x]);
          }
          if (y + 1 < this.rows && x - 1 >= 0) {
            this.cells[y][x].addNeighbour(direction.bottomleft, this.cells[y + 1][x - 1]);
          }
          if (y - 1 >=0 && x - 1 >= 0) {
            this.cells[y][x].addNeighbour(direction.topleft, this.cells[y - 1][x - 1]);
          }
        }
      }
    }
  }

  setupCallbacks() {
    for (let row of this.cells) {
      for (let cell of row) {
        if (cell) {
          cell.addCallback();
        }
      }
    }
  }

  setupSize() {
    $(`#gameboard`).attr(
      `viewBox`,
      `${
        -0.5 * this.scale
      } ${
        -0.5 * this.scale
      } ${
        this.cols * 1.5 * this.scale + 0.5 * this.scale + this.scale
      } ${
        (this.rows + 1) * 0.86602540378 * this.scale + this.scale
      }`
    );
  }
}
