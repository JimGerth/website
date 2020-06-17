const express = require('express');
const router = express.Router();

const { crc24 } = require('crc');
const hash = val => crc24(val.toString()).toString(16);

router.get('/akari/:id', (req, res) => {
  switch (req.params.id) {
    case hash(1):
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
    case hash(2):
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
    case hash(3):
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
    case hash(4):
      res.json({
        4   : { free: false, constraint: 1    },
        28  : { free: false, constraint: 1    },
        30  : { free: false, constraint: 2    },
        35  : { free: false, constraint: 1    },
        40  : { free: false, constraint: null },
        89  : { free: false, constraint: 2    },
        124 : { free: false, constraint: 2    },
        128 : { free: false, constraint: 1    },
        152 : { free: false, constraint: null },
        164 : { free: false, constraint: 3    }
      });
      break;
    case hash(5):
      res.json({
        0   : { free: false, constraint: 0    },
        5   : { free: false, constraint: 1    },
        16  : { free: false, constraint: 2    },
        81  : { free: false, constraint: 2    },
        84  : { free: false, constraint: 3    },
        87  : { free: false, constraint: 2    },
        147 : { free: false, constraint: 1    },
        152 : { free: false, constraint: 2    },
        160 : { free: false, constraint: 2    }
      });
      break;
    case hash(6):
      res.json({
        0   : { free: false, constraint: null },
        4   : { free: false, constraint: null },
        12  : { free: false, constraint: null },
        14  : { free: false, constraint: 1    },
        24  : { free: false, constraint: null },
        35  : { free: false, constraint: 0    },
        39  : { free: false, constraint: null },
        40  : { free: false, constraint: 2    },
        54  : { free: false, constraint: null },
        57  : { free: false, constraint: null },
        69  : { free: false, constraint: null },
        86  : { free: false, constraint: 2    },
        95  : { free: false, constraint: 0    },
        99  : { free: false, constraint: null },
        114 : { free: false, constraint: null },
        129 : { free: false, constraint: null },
        144 : { free: false, constraint: null },
        147 : { free: false, constraint: 1    },
        152 : { free: false, constraint: 1    },
        156 : { free: false, constraint: null },
        157 : { free: false, constraint: null },
        164 : { free: false, constraint: null },
        168 : { free: false, constraint: null },
      });
      break;
    default:
      res.status(404).end();
  }
});

module.exports = router;
