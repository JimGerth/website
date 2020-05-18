$(document).ready(() => {
  let scale = 50;
  new Cell(1).setup({
    x: 400,
    y: 100,
    scale: scale
  });
  new Cell(2).setup({
    x: 400 - 1.5 * scale,
    y: 100 + 0.866 * scale,
    scale: scale
  });
  new Cell(3).setup({
    x: 400 + 1.5 * scale,
    y: 100 + 0.866 * scale,
    scale: scale
  });
  new Gameboard();
});
