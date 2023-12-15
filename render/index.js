const express = require('express');
const userRouter = require('./routes/user');
const groupRouter = require('./routes/group');
const reviewRouter = require('./routes/review');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/reviews', reviewRouter);

app.get('/', (req, res) => {
  res.send('Hello');
});
