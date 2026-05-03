const { Pool } = require('pg');

const pool = new Pool({
  host:     'localhost',
  port:     5432,
  database: 'CSE412 Group Project',
  user:     'postgres',
  password: '1234' 
});

module.exports = pool;