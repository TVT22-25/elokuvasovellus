require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const testRouter = require('./routes/test');
const app = express();
const { Pool } = require('pg');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/test', testRouter);

app.get('/', (req, res) => {
  res.send('Hello');
})

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'moviedb',
  password: 'terhi',
  port: 5432,
});

app.get('/getprofileinfo', async (req, res) => {
//  const id = req.params.id;
  const id = req.query.id;
  console.log(req.query);
  console.log(`query id: ${id}`);

  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * from users where id=${id}`
    );
    const insertedData = result.rows[0];
    client.release();

    res.json({ success: true, data: insertedData });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
