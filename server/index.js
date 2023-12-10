require('dotenv').config();
const express = require('express');
const userTestRouter = require('./routes/userTest');
const groupTestRouter = require('./routes/groupTest');
const reviewTestRouter = require('./routes/reviewTest');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/users', userTestRouter);
app.use('/groups', groupTestRouter);
app.use('/reviews', reviewTestRouter);

app.get('/', (req, res) => {
  res.send('Hello');
});
