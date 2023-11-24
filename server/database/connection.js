const pg = require('pg');
const { Pool } = pg;

const pgPool = new Pool({
  host: 'dpg-cle4lomf27hc738q1dvg-a.frankfurt-postgres.render.com',
  port: 5432,
  database: 'database_obw7',
  user: 'user',
  password: 'T8C4AuGYXEmLN4DidI9ZI4DkLQk6oBJk',
  ssl: true,
});

pgPool.connect((err) => {
  if (err) {
    console.error(err.message);
  }
});

module.exports = { pgPool };
