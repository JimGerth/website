class Cell {
  constructor(id, constraint) {
    this.id = id;
    this.constraint = constraint;
    this.free = constraint == null;
    this.lightsource = false;
    this.illuminated = false;
    this.neighbours = [null, null, null, null, null, null];
  }

  // get class => {
  //   return `.cssclass`;
  // }

  addNeighbour(direction, neighbour) {
    this.neighbours[direction] = neighbour;
  }

  show(context) {
    // calculate the points of the hexagon
    let points = [];
    for (let angle = 0; angle < 360; angle += 60) {
      let radians = angle * (Math.PI / 180);
      points.push(new Point(
        context.x + context.scale * Math.sin(radians),
        context.y + context.scale * Math.cos(radians)
      ));
    }
    // remove the previous hexagon
    $(`#${this.id}`).remove();
    // add the new hexagon with updated state
    $(`#gameboard`).append(`<polygon
      id="${this.id}"
      class="cell"
      onclick="handleClick(${this.id})"
      points="
        ${points[0].x},${points[0].y}
        ${points[1].x},${points[1].y}
        ${points[2].x},${points[2].y}
        ${points[3].x},${points[3].y}
        ${points[4].x},${points[4].y}
        ${points[5].x},${points[5].y}
    "/>`);
    // refresh the svg to show new element
    $(`body`).html($(`body`).html());
  }
}
