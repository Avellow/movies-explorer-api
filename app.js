const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// временный хард-код. Удалить при реализации авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '625fe0fd077c3e9c8339dd36',
  };
  next();
});
// конец хард-коддинга



app.use('/movies', require('./routes/movies'));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
