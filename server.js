const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Setup MongoDB and Mongoose

const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://reacteur:reacteur123@ds241121.mlab.com:41121/reacteur-wish-list',
  { useNewUrlParser: true }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('We are connected to database');
});

//Set up model

var wishSchema = new mongoose.Schema({
  name: String
});

var Wish = mongoose.model('Wish', wishSchema);

// var myWish = new Wish({ name: 'iPhone X' });
// myWish.save();

//Routes

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/listWishes', (req, res) => {
  Wish.find(function(err, wishes) {
    if (err) return console.error(err);

    res.send(wishes);
  });
});

app.post('/addWish', (req, res) => {
  const name = req.body.name;

  var newWish = new Wish({ name });

  newWish.save(function(err, wish) {
    if (err) return console.error(err);
    res.send('OK');
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
