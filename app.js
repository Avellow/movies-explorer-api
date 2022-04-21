require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { login, createUser } = require('./controllers/user');
const { userSigninValidator, userSignupValidator } = require('./middlewares/userValidator');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', userSignupValidator, createUser);
app.post('/signin', userSigninValidator, login);

app.use(auth);

app.use('/movies', require('./routes/movies'));

app.use(errorLogger);

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
