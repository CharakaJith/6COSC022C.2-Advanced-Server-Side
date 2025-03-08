const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// middleware to log called endpoints
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} | ${new Date()}`);
  next();
});

// setup routing paths
// app.use('/api/task', taskRouter);

const ENV = process.env.ENV || 'development';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`${ENV} | ${PORT}`);
});
