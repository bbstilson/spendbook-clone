// In developement mode, load the environment variables.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');
// SSL connections are required for Heroku Postgres on the Common Runtime. Also, the call to 
// pg.defaults.ssl must be done before any connection to the database is created.
// https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
// pg.defaults.ssl = true;

const app = express();

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// // ALLOW CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH');
//   next();
// });
app.set('port', (process.env.PORT || 1337));
app.use(morgan('dev')); // logging
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const DATABASE_URL = process.env.DATABASE_URL;

/**
 * GET transactions by user id
 */
app.get('/api/user/:uid', (req, res) => {
  const uid = req.params.uid;

  const QUERY =
    'SELECT t.*, u.name, u.total FROM transactions t ' +
    'INNER JOIN users u ' +
    'ON u.uid = t.uid ' +
    'WHERE u.uid = $1 ' +
    'ORDER BY t.date DESC;'

  pg.connect(DATABASE_URL, (err, client) => {
    if (!err) {
      client.query(QUERY, [uid], (err, result) => {
        if (!err) {
          if (result.rowCount === 0) {
            const noTransactionsFound = [{ err: 'No transactions.', total: '$0.00', name: '' }];
            res.json(successJson(noTransactionsFound));
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
 * PATCH user total
 */
app.patch('/api/user/:uid', (req, res) => {
  const uid = req.params.uid;
  const total = req.body.total;

  const QUERY = 'UPDATE users SET total = $1 WHERE uid = $2';

  pg.connect(DATABASE_URL, (err, client) => {
    if (!err) {
      client.query(QUERY, [total, uid], (err, result) => {
        if (!err) {
          const successMsg = `Total for '${uid}' is now ${total}`;
          res.json(successJson(successMsg));
        } else {
          res.json({ status: 500, msg: err.detail });
        }
      });
    } else {
      failedToConnect(res);
    }
  });
});

/**
 * POST a new user.
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
app.post('/api/transaction', (req, res) => {
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
 res.send({ status: 500, msg: 'Failed to connect to database.' });
}


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
