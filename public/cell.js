class cell {
  constructor(id, constraint) {
    this.id = id;
    this.constraint = constraint;
    this.free = constraint == null;
    this.lightsource = false;
    this.illuminated = false;
    this.neighbours = [null, null, null, null, null, null];
  }

  get class => {
    return `.cssclass`;
  }

  addNeighbour(direction, neighbour) {
    this.neighbours[direction] = neighbour;
  }

  show(context) {
    // calculate the points of the hexagon
    let points[];
    for (angle = 0; a < 360; a += 60) {
      let radians = angle * (Math.PI / 180);
      points.push(Point(
        context.scale * Math.cos(radians),
        context.scale * Math.sin(radians)
      ));
    }
    // remove the previous hexagon
    $(`#${this.id}`).remove();
    // add the new hexagon with updated state
    $(`#gameboard`).append(`<polygon
      id="${this.id}"
      class="${cell}"
      points="
        ${points[0].x},${points[0].y}
        ${points[1].x},${points[1].y}
        ${points[2].x},${points[2].y}
        ${points[3].x},${points[3].y}
        ${points[4].x},${points[4].y}
        ${points[5].x},${points[5].y}
    "</polygon>`);
    // add click event handler to <polygon> element
    $(`#${this.id}`).click(this.handleClick);
  }

  handleClick() {
    alert("clicked hexagon!");
  }
}
