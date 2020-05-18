class Gameboard {
  constructor(size, scale) {
    this.size = size;
    this.scale = scale;
    this.xoffset = scale * 1.5;
    this.yoffset = scale * 0.86602540378;
    this.cells = [];
    this.setup();
  }

  setup() {
    let context = {};
    for (cell of this.cells) {
      cell.setup(context);
    }
    // add neighbours
    // reparse body to make the new svg elements actually show up
    $(`body`).html($(`body`).html());
    // connect callbacks
    this.connect();
  }

  connect() {
    // connect callbacks to <polygon> elements for each cell
    for (cell of this.cells) {
      cell.connect();
    }
  }

  count(size) {
    if (size == 0) {
      return 0;
    } else if (size == 1) {
      return 1;
    } else {
      return count(size - 1) + size * 6 - 6;
    }
  }
}
