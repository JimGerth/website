class Cell {
  constructor(id, free, constraint, x, y, scale) {
    this.id = id;
    this.free = free;
    this.constraint = constraint;
    this.x = x;
    this.y = y;
    this.scale = scale;

    this.lightsource = false;
    this.litUpFrom = [false, false, false, false, false, false];

    this.neighbours = [null, null, null, null, null, null]; // this.adjacent?

    this.setup();
  }

  get element() { // remove if this is only used in this.connect()
    return $(`#${this.id}`)
  }

  get illuminated() {
    for (var x of this.litUpFrom) {
      if (x) {
        return true;
      }
    }
    return false;
  }

  setup() {
    // calculate the points of the hexagon
    let points = [];
    for (let angle = 0; angle < 360; angle += 60) {
      let radians = angle * (Math.PI / 180);
      points.push(new Point(
        this.x + this.scale * Math.cos(radians),
        this.y + this.scale * Math.sin(radians)
      ));
    }
    // add a new <polygon> element with correct location and sizing
    $(`#gameboard`).append(`
      <polygon id="${this.id}" class="cell" points="
        ${points[0].x},${points[0].y}
        ${points[1].x},${points[1].y}
        ${points[2].x},${points[2].y}
        ${points[3].x},${points[3].y}
        ${points[4].x},${points[4].y}
        ${points[5].x},${points[5].y}
      "/>
    `);
    // add optional text displaying the constraint of a cell
    if (!this.free && this.constraint) {
      $(`#gameboard`).append(`
        <text x=${this.x} y=${this.y}>
          ${this.constraint}
        </text>
      `);
    }
    this.update();
  }

  addNeighbour(direction, neighbour) {
    this.neighbours[direction] = neighbour;
  }

  addCallback() {
    this.element.click(this.handleClick.bind(this));
  }

  handleClick() {
    if (this.free) {
      this.lightsource = !this.lightsource;
    }
    this.update();
  }

  update(direction) {
    // if direction is given only update the cell in that direction
    // if not update neighbours in all direcions
    this.updateState();
    this.updateClass();
    this.updateNeighbours(direction);
  }

  updateState() {
    if (this.free && !this.lightsource) {
      for (var direction = 0; direction < 6; direction++) {
        if (this.neighbours[direction]) {
          this.litUpFrom[direction] =
            this.neighbours[direction].lightsource ||
            this.neighbours[direction].litUpFrom[direction];
        }
      }
    }
  }

  updateClass() {
    if (this.free) {
      this.element.removeClass(`wall`);
      if (this.lightsource) {
        this.element.addClass(`lightsource`);
      } else {
        this.element.removeClass(`lightsource`);
      }
      if (this.illuminated) {
        this.element.addClass(`illuminated`);
      } else {
        this.element.removeClass(`illuminated`);
      }
    } else {
      this.element.addClass(`wall`);
    }
  }

  updateNeighbours(direction) {
    if (direction) {
      if (this.neighbours[direction]) {
        this.neighbours[direction].update(direction);
      }
    } else {
      for (var dir = 0; dir < 6; dir++) {
        if (this.neighbours[dir]) {
          this.neighbours[dir].update(dir);
        }
      }
    }
  }
}
