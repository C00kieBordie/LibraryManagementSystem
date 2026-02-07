const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hidden_archives_db',
  password: 'CookiesJars',
  port: 5432,
});


app.post('/api/login', async (req, res) => {
  const {email, password} = req.body;
  try {
    const q = 'SELECT * FROM public."Users" WHERE "emailAddress" = $1 AND "password" = $2';
    const values = [email, password];
    const result = await pool.query(q, values);
    if(result.rows.length > 0){
      const user = result.rows[0];
      res.status(200).json({ 
        ok: true,
        message: 'User successfully logged in!', 
        user: { username: user.username, email: user.emailAddress } 
      });
    }else {
      res.status(401).json({ ok: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ ok: false, message: err.message });
  }
});

app.post('/api/getBooks', async (req, res) => {
  try {
    const q = `SELECT 
                b."ID",
                b."imageIdentifier" AS "imgSrc",
                b."bookTitle" AS "title",
                a."authorName" AS "author",
                b."status",
                b."quantity" AS "qty"
              FROM
                public."Books" b
              INNER JOIN 
                public."Authors" a ON b."authorID" = a."ID";`;
    const result = await pool.query(q);
    if(result.rows.length > 0){
      const user = result.rows[0];
      res.status(200).json({ 
        ok: true,
        message: 'Books retrieved successfully!', 
        books: { result: result.rows }
      });
    }else {
      res.status(401).json({ ok: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ ok: false, message: err.message });
  }
});

app.listen(3000, () => console.log('Backend running on port 3000'));
