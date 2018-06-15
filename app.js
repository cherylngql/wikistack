const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const routes = require('./routes/posts');

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
