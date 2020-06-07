const express = require('express');
const path = require('path');
const port = 3000;

const app = express();
const server = app.listen(port, console.log(`listening on port ${port}`));

app.use(express.static(path.join(__dirname,'public')));