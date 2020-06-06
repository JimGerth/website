let PREVIOUS_INPUT_MODE = `clear`;
let INPUT_MODE = `lightUp`; // lightUp || crossOut || clear
let CELL_CHANGED = -1;

$(document).ready(() => {
  $.getJSON('/data/akari/hexagonal/1', data => {
    new Gameboard(8, 30, data);
  });
});
