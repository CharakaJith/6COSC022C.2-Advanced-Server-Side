const express = require('express');
const cors = require('cors');
const dateRouter = require('./routes/date.routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// serve static files from public folder
app.use(express.static('public'));

// middleware to log called endpoints
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} | ${new Date()}`);
  next();
});

// setup routing paths
app.use('/api/date', dateRouter);

const ENV = process.env.ENV || 'development';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`${ENV} | ${PORT}`);
});
