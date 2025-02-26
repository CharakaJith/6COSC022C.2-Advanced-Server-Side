const express = require('express');
const cors = require('cors');
const initialize = require('./database/initialize');
const movieRouter = require('./routes/movie.routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// initialize database
const initialization = async () => {
  // create tables
  await initialize.createTables();

  // poppulate movies table
  await initialize.populateMovies();
};
initialization();

// serve static files from public folder
app.use(express.static('public'));

// middleware to log called endpoints
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} | ${new Date()}`);
  next();
});

// setup routing paths
app.use('/api/movie', movieRouter);

const ENV = process.env.ENV || 'development';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`${ENV} | ${PORT}`);
});
