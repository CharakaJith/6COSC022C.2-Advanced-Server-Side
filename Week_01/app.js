const express = require('express');
const cors = require('cors');
require('dotenv').config();

const moduleRouter = require('./routes/module.routes');

const app = express();

app.use(cors());
app.use(express.json());

// serve static files from public folder
app.use(express.static('public'));

// setup routing paths
app.use('/api/module', moduleRouter);

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running...');
  console.log(`${ENV} | ${PORT}`);
});
