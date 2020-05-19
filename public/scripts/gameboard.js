class Gameboard {
  constructor(size, scale) {
    this.size = size;
    this.scale = scale;
    this.xoffset = scale * 1.5;
    this.yoffset = scale * 0.86602540378;
    this.cells = new Array(this.rows).fill(new Array(this.cols).fill(null));
    this.setup();
  }

  get rows() { return 3 * (this.size - 1) + this.size; }
  get cols() { return 2 * this.size - 1; }

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
            x * 1.5 * this.scale + this.scale,
            y * 0.86602540378 * this.scale + 0.86602540378 * this.scale,
            this.scale
          );
          id++;
        }
      }
    }
    // adding neighbours for all cells
    // for (let x = 0; x < this.cols; x++) {
    //   for (let y = 0; y < this.rows; y++) {
    //     console.log(x);
    //     console.log(y);
    //     console.log(this.cells[y][x]);
    //     if (this.cells[y][x]){
    //       if (this.cells[y - 2][x]) {
    //         this.cells[y][x].addNeighbour(direction.top, this.cells[y - 2][x]);
    //       }
    //       if (this.cells[y - 1][x + 1]) {
    //         this.cells[y][x].addNeighbour(direction.topright, this.cells[y - 1][x + 1]);
    //       }
    //       if (this.cells[y + 1][x + 1]) {
    //         this.cells[y][x].addNeighbour(direction.bottomright, this.cells[y + 1][x + 1]);
    //       }
    //       if (this.cells[y + 2][x]) {
    //         this.cells[y][x].addNeighbour(direction.bottom, this.cells[y + 2][x]);
    //       }
    //       if (this.cells[y + 1][x - 1]) {
    //         this.cells[y][x].addNeighbour(direction.bottomleft, this.cells[y + 1][x - 1]);
    //       }
    //       if (this.cells[y - 1][x - 1]) {
    //         this.cells[y][x].addNeighbour(direction.topleft, this.cells[y - 1][x - 1]);
    //       }
    //     }
    //   }
    // }
    // reparse body to make the new svg elements actually show up
    $(`body`).html($(`body`).html());
    // connect callbacks
    // this.connect();
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
