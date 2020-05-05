const functions = require('firebase-functions');
const compression = require('compression');
const cors = require('cors');
const admin = require('firebase-admin');
const express = require('express');

const isDev = process.env.NODE_ENV === undefined ? false : process.env.NODE_ENV.trim() === 'dev';

var serviceAccount = require('./keys/service.json');

const app = express();

if (isDev) {
  const cors = require('cors');
  app.use(cors());
}

app.set('trust proxy', true);
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// Example route
app.get('/api', (req, res) => {
  res.sendStatus(200);
});

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://adamw-ph.firebaseio.com'
});

exports.app = functions.https.onRequest(app);
