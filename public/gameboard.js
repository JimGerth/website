class Gameboard {
  constructor(size, scale) {
    this.size = size;
    this.scale = scale;
    this.xoffset = 1.73205080757 * scale;
    this.yoffset = scale;
    this.cells = [];
    setup();
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
    connect();
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
