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
    this.neighbours = [null, null, null, null, null, null];
    this.setup();
  }

  // get class => {
  //   return `.cssclass`;
  // }

  get element() {
    return $(`#${this.id}`);
  }

  addNeighbour(direction, neighbour) {
    this.neighbours[direction] = neighbour;
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

  connect() {
    $(`#${this.id}`).click(this.click);
  }

  click() {
    console.log(`you clicked cell number ${this.id}`);
  }

  update() {
    // set correct css class of cell based on state of this object
    this.element.addClass(`cell`);
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
