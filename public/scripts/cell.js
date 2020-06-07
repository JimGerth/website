class Cell {
  constructor(id, free, constraint, x, y, scale) {
    this.id = id;
    this.free = free;
    this.constraint = constraint;
    this.x = x;
    this.y = y;
    this.scale = scale;

    this.lightsource = false;
    this.crossedOut = false;
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
      "></polygon>
      <g class="cross">
        <line style="stroke:black;stroke-width:1"
          x1="${this.x - 0.3 * this.scale}"
          y1="${this.y + 0.3 * this.scale}"
          x2="${this.x + 0.3 * this.scale}"
          y2="${this.y - 0.3 * this.scale}"
        ></line>
        <line style="stroke:black;stroke-width:1"
          x1="${this.x - 0.3 * this.scale}"
          y1="${this.y - 0.3 * this.scale}"
          x2="${this.x + 0.3 * this.scale}"
          y2="${this.y + 0.3 * this.scale}"
        ></line>
      </g>
    `);
    // add optional text displaying the constraint of a cell
    if (!this.free && this.constraint != null) {
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

  handleClick(e) {
    e.preventDefault();
    if (this.free) {
      switch (INPUT_MODE) {
        case `lightUp`:
          if (!this.lightsource || this.crossedOut) {
            this.lightsource = true;
            this.crossedOut = false;
          } else if (CELL_CHANGED == this.id && PREVIOUS_CELL_CHANGED == this.id && PREVIOUS_INPUT_MODE == `crossOut`) {
            INPUT_MODE = `clear`;
            this.lightsource = false;
            this.crossedOut = false;
            PREVIOUS_INPUT_MODE = `lightUp`;
          } else {
            INPUT_MODE = `crossOut`;
            this.lightsource = false;
            this.crossedOut = true;
            PREVIOUS_INPUT_MODE = `lightUp`;
          }
          break;
        case `crossOut`:
          if (this.lightsource || !this.crossedOut) {
            this.lightsource = false;
            this.crossedOut = true;
          } else if (CELL_CHANGED == this.id && PREVIOUS_CELL_CHANGED == this.id && PREVIOUS_INPUT_MODE == `lightUp`) {
            INPUT_MODE = `clear`;
            this.lightsource = false;
            this.crossedOut = false;
            PREVIOUS_INPUT_MODE = `crossOut`;
          } else {
            INPUT_MODE = `lightUp`;
            this.lightsource = true;
            this.crossedOut = false;
            PREVIOUS_INPUT_MODE = `crossOut`;
          }
          break;
        case `clear`:
          if (this.lightsource || this.crossedOut) {
            this.lightsource = false;
            this.crossedOut = false;
          } else {
            switch (PREVIOUS_INPUT_MODE) {
              case `lightUp`:
                INPUT_MODE = `crossOut`;
                this.lightsource = false;
                this.crossedOut = true;
                break;
              case `crossOut`:
                INPUT_MODE = `lightUp`;
                this.lightsource = true;
                this.crossedOut = false;
                break;
            }
            PREVIOUS_INPUT_MODE = `clear`;
          }
          break;
        default:
          this.lightsource = !this.lightsource;
      }
      PREVIOUS_CELL_CHANGED = CELL_CHANGED;
      CELL_CHANGED = this.id;
      console.log(PREVIOUS_INPUT_MODE);
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
      if (this.crossedOut) {
        this.element.addClass(`crossedOut`);
      } else {
        this.element.removeClass(`crossedOut`);
      }
    } else {
      this.element.addClass(`wall`);
    }
  }

  updateNeighbours(direction) {
    if (direction) {
      if (this.neighbours[direction] && this.neighbours[direction].free) {
        this.neighbours[direction].update(direction);
      }
    } else {
      for (var dir = 0; dir < 6; dir++) {
        if (this.neighbours[dir] && this.neighbours[dir].free) {
          this.neighbours[dir].update(dir);
        }
      }
    }
  }
}
