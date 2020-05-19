class Cell {
  constructor(id, constraint, x, y, scale) {
    this.id = id;
    this.constraint = constraint;
    this.x = x;
    this.y = y;
    this.scale = scale;

    this.free = constraint == null;
    this.lightsource = false;
    this.illuminated = false;

    this.neighbours = [null, null, null, null, null, null]; // this.adjacent?

    this.setup();
  }

  get element() { // remove if this is only used in this.connect()
    return $(`#${this.id}`)
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
    $(`#gameboard`).append(`<polygon
      id="${this.id}"
      class="cell"
      points="
        ${points[0].x},${points[0].y}
        ${points[1].x},${points[1].y}
        ${points[2].x},${points[2].y}
        ${points[3].x},${points[3].y}
        ${points[4].x},${points[4].y}
        ${points[5].x},${points[5].y}
    "/>`);
    this.update();
  }

  addNeighbour(direction, neighbour) {
    this.neighbours[direction] = neighbour;
  }

  addCallback() {
    this.element.click(this.handleClick.bind(this));
  }

  handleClick() {
    console.log(`you clicked cell number ${this.id}`);
    this.lamp = !this.lamp;

    this.update();
  }

  update() {
    this.updateState();
    this.updateClass();
    this.updateNeighbours();
  }

  updateState() {
    // calculate state of cell based on neighbours
  }

  updateClass() {
    if (this.lamp) {
      this.element.addClass(`lamp`);
    } else {
      this.element.removeClass(`lamp`);
    }
    if (this.illuminated) {
      this.element.addClass(`light`);
    } else {
      this.element.removeClass(`light`);
    }
  }

  updateNeighbours() {
    // call update on neighbours
    // (probably only need to update neighbours that would be
    // illuminated by this cell...)
  }
}





// class Cell {
// 	this.free; // bool if cell is filled or free
// 	this.constraint; // [0,3] only if filled
// 	this.neighbours; // array of cells with a DIR as index
// 	this.illuminated; // array of DIRs, from which the cell is being lit
// 	this.lightsource; // bool, if lamp is placed in cell
//
// 	this.from = (this, from) => return this.from.includes(dir);
//
// 	this.propagate = () => {
// 		for (dir = 0; dir < 6; dir++) {
// 			if (this.free && this.neighbours[dir].from(dir)) {
// 				this.illuminated.push(dir);
// 			}
// 		}
// 	}
//
// 	show() {
// 		// change <polygon> element with ID to appropriate class .lamp/.black/etc.
//    // yes! the svg element doesnt have to be added again each time! just change the css class...
// 	}
// }
