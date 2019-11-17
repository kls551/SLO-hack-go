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

app.get('/parkings/:level', async (req, response) => {
  pool.query(`SELECT * FROM parkings where level=${req.params.level}`, (error, results) => {
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