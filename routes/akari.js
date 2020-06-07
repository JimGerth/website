const express = require('express');
const router = express.Router();

const { crc24 } = require('crc');
const hash = val => crc24(val.toString()).toString(16);

router.get('/', (req, res) => {
  res.send('test');
});

router.get('/:id', (req, res) => {
  res.send(`<!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Jim Gerth</title>
        <link rel="stylesheet" href="/style/css/master.css">
        <script type="text/javascript" src="/libraries/jquery.js"></script>
        <script type="text/javascript" src="/scripts/direction.js"></script>
        <script type="text/javascript" src="/scripts/point.js"></script>
        <script type="text/javascript" src="/scripts/cell.js"></script>
        <script type="text/javascript" src="/scripts/gameboard.js"></script>
        <script type="text/javascript">
          let PREVIOUS_INPUT_MODE = 'clear';
          let INPUT_MODE = 'lightUp';
          let CELL_CHANGED = -1;

          $(document).ready(() => {
            $.getJSON('/data/akari/${req.params.id}', data => {
              new Gameboard(8, 30, data);
            });
          });
        </script>
      </head>
      <body>

        <svg id="gameboard">
        </svg>

      </body>
    </html>
  `);
});

module.exports = router;
