const express = require('express');
const cors = require('cors');
const initialize = require('./database/initialize');
const taskRouter = require('./routes/task.routes');
require('dotenv').config();

const app = express();

// initialize database
const initialization = async () => {
  // create tables
  await initialize.createTables();
};
initialization();

// TODO: serve static files from public folder

app.use(cors());
app.use(express.json());

// middleware to log called endpoints
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} | ${new Date()}`);
  next();
});

// setup routing paths
app.use('/api/task', taskRouter);

const ENV = process.env.ENV || 'development';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`${ENV} | ${PORT}`);
});
