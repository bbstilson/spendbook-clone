const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');
// SSL connections are required for Heroku Postgres on the Common Runtime. Also, the call to 
// pg.defaults.ssl must be done before any connection to the database is created.
// https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
// pg.defaults.ssl = true;

const DATABASE_URL = process.env.DATABASE_URL || 'postgres:///brandons';

const app = express();
// ALLOW CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(morgan('dev')); // logging
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * GET a transaction table by user id
 *
 * success (if 'brandonsSuperCoolId123' exists in the db)
 * curl http://localhost:1337/api/user/brandonsSuperCoolId123
 *
 * failure (assuming 'ravioliravioligivemetheformuoli' wasn't added)
 * curl http://localhost:1337/api/user/ravioliravioligivemetheformuoli
 */
app.get('/api/user/:uid', (req, res) => {
  const uid = req.params.uid;

  const QUERY =
    'SELECT t.*, u.name, u.total FROM transactions t ' +
    'INNER JOIN users u ' +
    'ON u.uid = t.uid ' +
    'WHERE u.uid = $1 ' +
    'ORDER BY date;'

  pg.connect(DATABASE_URL, (err, client) => {
    if (!err) {
      client.query(QUERY, [uid], (err, result) => {
        if (!err) {
          if (result.rows.length === 0) {
            const errorMsg = `No results for uid: ${uid}`;
            res.json({ status: 500, msg: errorMsg });
          } else {
            res.json(successJson(result.rows));
          }
        } else {
          res.json({ status: 500, msg: err.detail });
        }
      })
    } else {
      failedToConnect(res);
    }
  });
});

/**
 * GET all users from the users table.
 *
 * curl http://localhost:1337/api/users
 */
app.get('/api/users', (req, res) => {
  pg.connect(DATABASE_URL, (err, client) => {
    if (!err) {
      client.query('SELECT * FROM users', (err, result) => {
        if (!err) {
          res.json(successJson(result.rows));
        } else {
          res.json({ status: 400, msg: err.detail });
        }
      });
    } else {
      failedToConnect(res);
    }
  });
});

/**
 * POST a new user.
 *
 * curl -X POST -H "Content-Type: application/json" -d '{ "uid": "brandonsSuperCoolId123" }' http://localhost:1337/api/user
 * curl -X POST -H "Content-Type: application/json" -d '{ "uid": "allieAlsoHasAReallyCoolId" }' http://localhost:1337/api/user
 */
app.post('/api/user', (req, res) => {
  const uid = req.body.uid;
  const name = req.body.name;

  pg.connect(DATABASE_URL, (err, client) => {
    if (!err) {
      client.query('INSERT INTO users (uid, name) VALUES ($1, $2)', [uid, name], (err, result) => {
        if (!err) {
          const successMsg = `Sucessfully created user '${name}' with uid: ${uid}`;
          res.json(successJson(successMsg));
        } else {
          res.json({ status: 400, msg: err.detail });
        }
      });
    } else {
      failedToConnect(res);
    }
  });
});

/**
 * POST a new transaction
 */
/*
  curl -X POST -H "Content-Type: application/json" \
    -d '{ "uid": "123", "type": "EXPENSE", "category": "FOOD", "icon": "fa-food", "amount": 40, "notes": "it was good" }' \
    http://localhost:1337/api/transactions
 */
app.post('/api/transactions', (req, res) => {
  const { uid, tid, type, category, icon, amount, notes, date } = req.body;

  const QUERY =
    'INSERT INTO transactions (uid, tid, type, category, icon, amount, notes, date) ' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';

  pg.connect(DATABASE_URL, (err, client) => {
    if (!err) {
      client.query(QUERY, [uid, tid, type, category, icon, amount, notes, date], (err, result) => {
        if (!err) {
          const successMsg = `Sucessfully created transaction: '${tid}' for user '${uid}'`;
          res.json(successJson(successMsg));
        } else {
          res.json({ status: 400, msg: err.detail });
        }
      });
    } else {
      failedToConnect(res);
    }
  });
});

/**
 * PATCH a transaction
 */

app.listen(1337);

/**
 * Util functions
 */

function successJson(res) {
  return {
    res,
    status: 200,
  };
}

function failedToConnect(res) {
  res.send({ status: 500, msg: "Failed to connect to database." });
}
