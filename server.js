const express = require('express');
const cors    = require('cors');
const pool    = require('./db');

const app = express();
app.use(cors());
app.use(express.json());


//products table CRUD operations

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Product');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, category, description, manufid } = req.body;
    const result = await pool.query(
      `INSERT INTO Product (name, category, description, manufid)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, category, description, manufid]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, manufid } = req.body;
    const result = await pool.query(
      `UPDATE Product
       SET name=$1, category=$2, description=$3, manufid=$4
       WHERE productid=$5
       RETURNING *`,
      [name, category, description, manufid, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM Product WHERE productid = $1', [id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



//other crud goes here



app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});