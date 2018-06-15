const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { db } = require('./models');
const wikiRoutes = require('./routes/wiki');
const usersRoutes = require('./routes/users');

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

app.use('/wiki', wikiRoutes);
app.use('/users', usersRoutes);

const PORT = 3000;
const init = async () => {
  await db.sync({force: true});
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();
