const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const akari = require('./routes/akari');
const data = require('./routes/data');

app.use(express.static('public'));
app.use('/akari', akari);
app.use('/data', data);

app.listen(PORT);
