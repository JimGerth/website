class Gameboard {
  constructor(size, scale) {
    this.size = size;
    this.scale = scale;

    this.xoffset = scale * 1.5;
    this.yoffset = scale * 0.86602540378;
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
    // initializing two dimensional cell aray
    let id = 0;
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (
          (this.size % 2 == 0 && x % 2 != y % 2) ||
          (this.size % 2 != 0 && x % 2 == y % 2)
        ) {
          this.cells[y][x] = new Cell(
            id,
            1,
            x * this.xoffset + this.scale, // this.scale = x board offset
            y * this.yoffset + 0.86602540378 * this.scale, // 0.86602540378 * this.scale = y board offset
            this.scale
          );
          id++;
        }
      }
    }
    // adding neighbours for all cells
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.cells[y][x]){
          if (y - 2 >= 0 && this.cells[y - 2][x]) {
            this.cells[y][x].addNeighbour(direction.top, this.cells[y - 2][x]);
          }
          if (y - 1 >= 0 && x + 1 < this.cols && this.cells[y - 1][x + 1]) {
            this.cells[y][x].addNeighbour(direction.topright, this.cells[y - 1][x + 1]);
          }
          if (y + 1 < this.rows && x + 1 < this.cols && this.cells[y + 1][x + 1]) {
            this.cells[y][x].addNeighbour(direction.bottomright, this.cells[y + 1][x + 1]);
          }
          if (y + 2 < this.rows && this.cells[y + 2][x]) {
            this.cells[y][x].addNeighbour(direction.bottom, this.cells[y + 2][x]);
          }
          if (y + 1 < this.rows && x - 1 >= 0 && this.cells[y + 1][x - 1]) {
            this.cells[y][x].addNeighbour(direction.bottomleft, this.cells[y + 1][x - 1]);
          }
          if (y - 1 >=0 && x - 1 >= 0 && this.cells[y - 1][x - 1]) {
            this.cells[y][x].addNeighbour(direction.topleft, this.cells[y - 1][x - 1]);
          }
        }
      }
    }
    // reparse body to make the new svg elements actually show up
    $(`body`).html($(`body`).html());
    // connect callbacks
    this.connect();
  }

  connect() {
    // connect callbacks to <polygon> elements for each cell
    for (let row of this.cells) {
      for (let cell of row) {
        if (cell) {
          cell.connect();
        }
      }
    }
  }

  // might not need this after all
  // count(size) {
  //   if (size == 1) {
  //     return 1;
  //   } else {
  //     return count(size - 1) + size * 6 - 6;
  //   }
  // }
}
