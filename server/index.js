const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
const router = require('express').Router();
const cors = require('cors');


const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123',
    port: 37770,
});

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});


app.get('/users', async (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
});

app.get('/user/:plate', async (request, response) => {
  pool.query('SELECT * FROM users where license_plate=$1 LIMIT 1', [request.params.plate.toUpperCase()],(error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
});

app.get('/parkings/:level', async (req, response) => {
  let result = await pool.query(`select p.*, u.expires from parkings p left JOIN users u on u.id = p.userid WHERE p.taken = TRUE
    and u.expires < NOW()`);
  if (result.rows) {
    let ids = result.rows.map(res => res.userid)
    let parkids = result.rows.map(res => res.id)
    try {
      let r2 = await pool.query(`Update parkings set taken = False, userid = NULL where
        id = ANY($1)`, [parkids]);
      let r1 = await pool.query(`delete from users where id = ANY($1)`, [ids]);
    } catch (err) {
      console.log(err)
    }
  }
  pool.query(`SELECT * FROM parkings where level=${req.params.level} order by id`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
});

app.get('/lvl', async (req, response) => {
  pool.query(`SELECT DISTINCT level FROM parkings order by level`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
});

app.post('/user', async (req, res) => {
  let body = req.body;
  pool.query(`INSERT INTO users (name, license_plate, credit_card, expires, price, totalhour)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
  `, [body.name.toLowerCase(), body.licensePlate.toUpperCase(), body.creditCard, body.expires, body.totalPrice, body.totalHour],
    (err, result) => {
      if (err) {
        throw err;
      }
      pool.query(`UPDATE parkings SET taken=TRUE, userid=$2 WHERE id=$1`, [body.space, result.rows[0].id], (err, r) => {
        if (err) {
          throw err;
        }
        res.status(200).json(result.rows);
      })
    }
  );
});