class Gameboard {
  constructor(size, scale) {
    this.size = size;
    this.scale = scale;
    this.xoffset = scale * 1.5;
    this.yoffset = scale * 0.86602540378;
    this.cells = [];
    for (let y = 0; y < this.rows; y++) {
      this.cells[y] = [];
    }
    this.setup();
  }

  get rows() { return 3 * (this.size - 1) + this.size; }
  get cols() { return 2 * this.size - 1; }

  setup() {
    // setup cell objects and add them to two dimensional cell array
    // in the right way
    let id = 0;
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        // looping through all possible cell positions
        // find out in which position to actually put a cell
        // if some stuff
        // this.cells[y][x] = new Cell(
        //   id,
        //   1,
        //   x * 1.5 * this.scale + this.scale,
        //   y * 0.86602540378 * this.scale + 0.86602540378 * this.scale,
        //   this.scale
        // );
        id++;
      }
    }
    // adding neighbours for all cells
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        this.cells[y][x].addNeighbour(direction.top, this.cells[y - 2][x]);
        this.cells[y][x].addNeighbour(direction.topright, this.cells[y - 1][x + 1]);
        this.cells[y][x].addNeighbour(direction.bottomright, this.cells[y + 1][x + 1]);
        this.cells[y][x].addNeighbour(direction.bottom, this.cells[y + 2][x]);
        this.cells[y][x].addNeighbour(direction.bottomleft, this.cells[y + 1][x - 1]);
        this.cells[y][x].addNeighbour(direction.topleft, this.cells[y - 1][x - 1]);
      }
    }
    // reparse body to make the new svg elements actually show up
    $(`body`).html($(`body`).html());
    // connect callbacks
    this.connect();
  }

  connect() {
    // connect callbacks to <polygon> elements for each cell
    for (let cell of this.cells) {
      cell.connect();
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
