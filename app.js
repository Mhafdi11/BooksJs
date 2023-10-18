const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const passport = require('passport');
const Collection = require("./mongo");

const app = express();
const port = 3000;

//const initPassport = require("./passport-config");
//initPassport(passport)

app.use(express.json());
app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');



app.get('/', (req, res) => {
    res.render('layout');
});

app.get('/books', (req, res) => {
    res.render('books');
});

//registration

app.get('/register', (req, res) => {
    res.render('registrations');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Collection({
      username: username,
      password: hashedPassword,
    });

    await user.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.redirect('/register');
  }
});  


app.get('/login', (req, res) => {
    res.render('login');
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Collection.findOne({ username: username });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.redirect('/books');
    } else {
      res.redirect('/login');
    }
});



app.get('/logout', (req, res) => {

    res.redirect('/');

});



app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});