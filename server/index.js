require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const testRouter = require('./routes/test');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/test', testRouter);

app.get('/', (req, res) => {
  res.send('Hello');
});
