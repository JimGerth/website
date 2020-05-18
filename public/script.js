$(document).ready(() => {
  new Gameboard();
  // new Cell(1).show({
  //   x: 100,
  //   y: 100,
  //   scale: 100
  // });
  // new Cell(2).show({
  //   x: 273,
  //   y: 100,
  //   scale: 100
  // });
  // new Cell(3).show({
  //   x: 100 + ((273-100)/2),
  //   y: 250,
  //   scale: 100
  // });
});

let handleClick = (e) => {
  console.log(e);
}
