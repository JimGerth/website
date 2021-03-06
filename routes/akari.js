const express = require('express');
const router = express.Router();

const { crc24 } = require('crc');
const hash = val => crc24(val.toString()).toString(16);

router.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Akari</title>
        <style>
          html, body {
            margin: 0;
            padding: 5vh 0 0 0;
          }
          #list {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          a {
            text-align: center;
            text-decoration: none;
            font-family: sans-serif;
            font-weight: bold;
            font-size: 4em;
            width: 66vw;
            margin: 2vh 0;
            padding: 5vh 20px;
            color: white;
            background-color: black;
            border-radius: 20px;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
            transition: box-shadow 50ms, transform 50ms;
          }
          a:hover {
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
            transform: scale(0.99);
          }
          #a1 {
            background-color: #23ba48;
          }
          #a2 {
            background-color: #2223be;
          }
          #a3 {
            background-color: #a46f45;
          }
          #a4 {
            background-color: #3b1052;
          }
          #a5 {
            background-color: #bd5ca9;
          }
          #a6 {
            background-color: #b1c55f;
          }
        </style>
      </head>
      <body>

        <div id="list">
          <a id="a1" href="/akari/2eba48">1</a>
          <a id="a2" href="/akari/2223be">2</a>
          <a id="a3" href="/akari/a46f45">3</a>
          <a id="a4" href="/akari/3b1052">4</a>
          <a id="a5" href="/akari/bd5ca9">5</a>
          <a id="a6" href="/akari/b1c55f">6</a>
          <a>...</a>
        </div>

      </body>
    </html>
  `);
});

router.get('/:id', (req, res) => {
  res.send(`<!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Akari</title>
        <link rel="stylesheet" href="/style/css/master.css">
        <script type="text/javascript" src="/libraries/jquery.js"></script>
        <script type="text/javascript" src="/scripts/direction.js"></script>
        <script type="text/javascript" src="/scripts/point.js"></script>
        <script type="text/javascript" src="/scripts/cell.js"></script>
        <script type="text/javascript" src="/scripts/gameboard.js"></script>
        <script type="text/javascript">
          let PREVIOUS_INPUT_MODE = 'clear';
          let INPUT_MODE = 'lightUp';
          let PREVIOUS_CELL_CHANGED = -1;
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
