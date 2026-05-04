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
//this is final v2, v1 changes main: the exist pull from current
//merchant
app.get('/api/merchants', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Merchant');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/merchants', async (req, res) => {
  try {
    const { name, url } = req.body;
    const result = await pool.query(
      `INSERT INTO Merchant (name, url)
       VALUES ($1, $2)
       RETURNING *`,
      [name, url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/merchants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, url } = req.body;
    const result = await pool.query(
      `UPDATE Merchant
       SET name = $1, url = $2
       WHERE merchantid = $3
       RETURNING *`,
      [name, url, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/merchants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM Merchant WHERE merchantid = $1', [id]);
    res.json({ message: 'Merchant deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//manufacturer
app.get('/api/manufacturers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Manufacturer');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//merchprod
app.get('/api/merchprod', async (req, res) => {
  try {
    //pullig the readable merchant/product names too so the frontend can render labels directly instead of v1
    const result = await pool.query(`
      SELECT
        mp.merchantid,
        m.name AS merchantname,
        mp.productid,
        p.name AS productname,
        mp.price,
        mp.promotion,
        mp.shipping,
        mp.availability
      FROM merchprod mp
      JOIN merchant m ON mp.merchantid = m.merchantid
      JOIN product p ON mp.productid = p.productid
      ORDER BY m.name, p.name
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/merchprod error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/merchprod', async (req, res) => {
  try {
    const { merchantid, productid, price, promotion, shipping, availability } = req.body;
    const result = await pool.query(
      `INSERT INTO MerchProd (merchantid, productid, price, promotion, shipping, availability)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [merchantid, productid, price, promotion || null, shipping, availability]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/merchprod/:merchantid/:productid', async (req, res) => {
  try {
    const { merchantid: originalMerchantId, productid: originalProductId } = req.params;
    const { merchantid, productid, price, promotion, shipping, availability } = req.body;
    //the original composite key from the URL in case the user edits either ID in the form
    const result = await pool.query(
      `UPDATE MerchProd
       SET merchantid = $1,
           productid = $2,
           price = $3,
           promotion = $4,
           shipping = $5,
           availability = $6
       WHERE merchantid = $7 AND productid = $8
       RETURNING *`,
      [
        merchantid,
        productid,
        price,
        promotion || null,
        shipping,
        availability,
        originalMerchantId,
        originalProductId
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/merchprod/:merchantid/:productid', async (req, res) => {
  try {
    const { merchantid, productid } = req.params;
    await pool.query(
      'DELETE FROM MerchProd WHERE merchantid = $1 AND productid = $2',
      [merchantid, productid]
    );
    res.json({ message: 'Merchant product entry deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//ratings
app.get('/api/ratings', async (req, res) => {
  try {
    // Same idea here: include usernames/product names so the list view is easier to read than the old v
    const result = await pool.query(`
      SELECT 
        r.userid,
        u.username,
        r.productid,
        p.name AS productname,
        r.rating,
        r.comment,
        r.datereviewed
      FROM ratings r
      JOIN users u ON r.userid = u.userid
      JOIN product p ON r.productid = p.productid
      ORDER BY r.datereviewed
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/ratings error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/ratings', async (req, res) => {
  try {
    const { userid, productid, rating, comment, datereviewed } = req.body;
    const result = await pool.query(
      `INSERT INTO Ratings (userid, productid, rating, comment, datereviewed)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userid, productid, rating, comment || null, datereviewed]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/ratings/:userid/:productid', async (req, res) => {
  try {
    const { userid: originalUserId, productid: originalProductId } = req.params;
    const { userid, productid, rating, comment, datereviewed } = req.body;
    //Keeping the lookup thingy anchored to the original pair so edits to the key fields still work
    //E2V2: V1 doesnt work
    const result = await pool.query(
      `UPDATE Ratings
       SET userid = $1,
           productid = $2,
           rating = $3,
           comment = $4,
           datereviewed = $5
       WHERE userid = $6 AND productid = $7
       RETURNING *`,
      [
        userid,
        productid,
        rating,
        comment || null,
        datereviewed,
        originalUserId,
        originalProductId
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/ratings/:userid/:productid', async (req, res) => {
  try {
    const { userid, productid } = req.params;
    await pool.query(
      'DELETE FROM Ratings WHERE userid = $1 AND productid = $2',
      [userid, productid]
    );
    res.json({ message: 'Rating deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// user
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "users"');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await pool.query(
      `INSERT INTO "users" (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [username, email, password]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const result = await pool.query(
      `UPDATE "users"
       SET username = $1, email = $2, password = $3
       WHERE userid = $4
       RETURNING *`,
      [username, email, password, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM "users" WHERE userid = $1', [id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
