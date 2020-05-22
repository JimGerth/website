$(document).ready(() => {
  // make the logic server side, if possible?
  new Gameboard(8, 30, {
    15: {
      free: false,
      constraint: `0`
    }
  });
});
