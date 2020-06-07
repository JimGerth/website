const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const { crc24 } = require('crc');
const hash = val => crc24(val.toString()).toString(16).toUpperCase();


app.use(express.static('public'));

app.get('/akari/hexagonal/:num', (req, res) => {
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
            $.getJSON('/data/akari/hexagonal/${req.params.num}', data => {
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

app.get('/data/akari/hexagonal/:num', (req, res) => {
  switch (req.params.num) {
    case '1':
      res.json({
        4   : { free: false, constraint: 2    },
        12  : { free: false, constraint: null },
        16  : { free: false, constraint: null },
        19  : { free: false, constraint: null },
        22  : { free: false, constraint: null },
        23  : { free: false, constraint: 0    },
        24  : { free: false, constraint: 1    },
        36  : { free: false, constraint: 2    },
        37  : { free: false, constraint: null },
        39  : { free: false, constraint: null },
        40  : { free: false, constraint: 1    },
        42  : { free: false, constraint: 0    },
        49  : { free: false, constraint: null },
        52  : { free: false, constraint: null },
        53  : { free: false, constraint: null },
        54  : { free: false, constraint: null },
        56  : { free: false, constraint: 1    },
        60  : { free: false, constraint: null },
        63  : { free: false, constraint: null },
        76  : { free: false, constraint: null },
        77  : { free: false, constraint: null },
        81  : { free: false, constraint: null },
        82  : { free: false, constraint: null },
        83  : { free: false, constraint: 1    },
        84  : { free: false, constraint: 1    },
        85  : { free: false, constraint: null },
        86  : { free: false, constraint: null },
        87  : { free: false, constraint: 0    },
        99  : { free: false, constraint: null },
        105 : { free: false, constraint: null },
        108 : { free: false, constraint: null },
        112 : { free: false, constraint: null },
        114 : { free: false, constraint: null },
        115 : { free: false, constraint: null },
        116 : { free: false, constraint: 2    },
        119 : { free: false, constraint: null },
        126 : { free: false, constraint: 2    },
        128 : { free: false, constraint: null },
        130 : { free: false, constraint: null },
        132 : { free: false, constraint: null },
        144 : { free: false, constraint: null },
        145 : { free: false, constraint: null },
        146 : { free: false, constraint: 2    },
        149 : { free: false, constraint: 2    },
        152 : { free: false, constraint: null },
        156 : { free: false, constraint: null },
        164 : { free: false, constraint: 2    }
      });
      break;
    case '2':
      res.json({
        0   : { free: false, constraint: 1    },
        1   : { free: false, constraint: null },
        15  : { free: false, constraint: null },
        22  : { free: false, constraint: 0    },
        28  : { free: false, constraint: null },
        31  : { free: false, constraint: null },
        33  : { free: false, constraint: 1    },
        35  : { free: false, constraint: 1    },
        42  : { free: false, constraint: null },
        43  : { free: false, constraint: 0    },
        44  : { free: false, constraint: null },
        46  : { free: false, constraint: null },
        48  : { free: false, constraint: 0    },
        59  : { free: false, constraint: null },
        70  : { free: false, constraint: null },
        76  : { free: false, constraint: null },
        78  : { free: false, constraint: null },
        84  : { free: false, constraint: 2    },
        87  : { free: false, constraint: null },
        96  : { free: false, constraint: 0    },
        102 : { free: false, constraint: 1    },
        103 : { free: false, constraint: 0    },
        120 : { free: false, constraint: 0    },
        133 : { free: false, constraint: 1    },
        135 : { free: false, constraint: null },
        141 : { free: false, constraint: 1    },
        144 : { free: false, constraint: null },
        150 : { free: false, constraint: 2    },
        152 : { free: false, constraint: null },
        162 : { free: false, constraint: 0    },
        166 : { free: false, constraint: null },
        168 : { free: false, constraint: null }
      });
      break;
    case '3':
      res.json({
        2   : { free: false, constraint: null },
        18  : { free: false, constraint: null },
        24  : { free: false, constraint: 2    },
        32  : { free: false, constraint: null },
        35  : { free: false, constraint: 1    },
        43  : { free: false, constraint: 1    },
        84  : { free: false, constraint: 2    },
        89  : { free: false, constraint: 2    },
        102 : { free: false, constraint: null },
        109 : { free: false, constraint: 2    },
        128 : { free: false, constraint: 1    },
        130 : { free: false, constraint: null },
        133 : { free: false, constraint: 1    },
        137 : { free: false, constraint: 2    },
        139 : { free: false, constraint: null },
        152 : { free: false, constraint: 1    },
        158 : { free: false, constraint: 0    },
        162 : { free: false, constraint: 0    }
      });
      break;
  }
});

app.listen(PORT);
