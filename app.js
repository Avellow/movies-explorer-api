require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/user');
const { userSigninValidator, userSignupValidator } = require('./middlewares/userValidator');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./configs/ipLimiter');

const { PORT = 3000, DB_NAME = 'testmoviebd' } = process.env;
const app = express();

app.use(helmet());
app.use(limiter);

app.use(cors({
  origin: 'https://movies-expl.nomoredomains.work',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', userSignupValidator, createUser);
app.post('/signin', userSigninValidator, login);

app.use(auth);

require('./routes/index')(app);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
