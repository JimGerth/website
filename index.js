const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));

// app.get();

app.listen(PORT);
