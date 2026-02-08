const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'suPerRo1DEr';

const app = express();
app.use(cors());
app.use(express.json());
const bcrypt = require('bcrypt');
const validator = require('validator');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hidden_archives_db',
  password: 'CookiesJars',
  port: 5432,
});


app.post('/api/login', async (req, res) => {
  const {email, password} = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ ok: false, message: 'Please provide a valid email.' });
  }
  try {
    const q = 'SELECT * FROM public."Users" WHERE "emailAddress" = $1';
    const result = await pool.query(q, [email]);
    
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch){
      console.log("Bcrypt match found!");
      return res.status(200).json({ 
        ok: true, 
        token: user.status
      });
    }else{
      console.log("User not found in DB");
      return res.status(401).json({ ok: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error("BACKEND ERROR:", err.message);
    res.status(500).json({ ok: false, message: err.message });
  }
});


app.post('/api/register', async (req, res) => {
  const {username, email, password} = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ ok: false, message: 'Please provide a valid email.' });
  }
  console.log('started registering...')
  try {
    let q = 'SELECT * FROM public."Users" WHERE "emailAddress" = $1 OR "username" = $2';
    let values = [email, username];
    const result = await pool.query(q, values);

    if(result.rows.length > 0){
      return res.status(400).json({ 
        ok: false,
        message: 'User already exists.', 
      });
    }else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      q = `INSERT INTO public."Users" ("username", "password", "status", "emailAddress")
          VALUES($1, $2, $3, $4)`;
      values = [username, hashedPassword, 'user', email];
      await pool.query(q, values);

      res.status(201).json({
        ok: true,
        message: 'User successfuly registered!',
      })
    }
  }catch(err){
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
