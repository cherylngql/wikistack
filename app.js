const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { db } = require('./models');
const routes = require('./routes/mainRoute');

const app = express();
db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', routes);

const PORT = 3000;
console.log('this is db: ', db.User);
const init = async () => {
  await db.sync({force: true});
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();
