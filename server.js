const express = require("express");
const bodyParser = require("body-parser");
const { auth } = require("./firebase.js");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { async } = require("@firebase/util");
const { error } = require("console");
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/register", async(req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    console.log(email);
    console.log(pass);

    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
        const user = userCredential.user;
        res.send(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.send(errorMessage);
    });
})

app.post("/api/login", async(req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        res.send(uid);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.send("error").json({errorCode: errorCode, errorMessage: errorMessage});
    });
})

const db = mysql.createPool({
    host: '192.168.3.172',
    user: 'admin@localhost',
    password: 'code01',
    database: 'mobile',
  });

app.get('/api/test', (req, res) => {
    const sql = `SELECT * FROM tes`;
    const query = db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal server error');
      }
    //   res.send("Sukses");
      res.status(200).send(result);
    });
});

// Testing
app.post('/api/test', (req, res) => {
    const uid = req.body.uid;
    const distance = req.body.distance;
    const timer = req.body.timer;
  
    const sql = `INSERT INTO tes (uid, distance, timer) VALUES (?, ?, ?)`;
    const query = db.query(sql, [uid, distance, timer]);
  
    query.on('error', (err) => {
      console.log(err);
      res.status(500).send('Internal server error');
    });
  
    query.on('end', () => {
      res.status(200).send('Data tracking berhasil disimpan');
    });
});

// Testing
app.post('/api/test', (req, res) => {
  const uid = req.body.uid;
  const distance = req.body.distance;
  const timer = req.body.timer;

  const sql = `INSERT INTO tes (uid, distance, timer) VALUES (?, ?, ?)`;
  const query = db.query(sql, [uid, distance, timer]);

  query.on('error', (err) => {
    console.log(err);
    res.status(500).send('Internal server error');
  });

  query.on('end', () => {
    res.status(200).send('Data tracking berhasil disimpan');
  });
});

app.get('/api/tracking', (req, res) => {
  const sql = `SELECT * FROM tracking`;
  const query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
    }

    res.status(200).send(result);
  });
});

// Post Data Tracking
app.post('/api/tracking', (req, res) => {
    const uid = req.body.uid;
    const distance = req.body.distance;
    const timer = req.body.timer;
    const image = req.body.image;
  
    const base64Image = Buffer.from(image, 'base64');
  
    const sql = `INSERT INTO tracking (uid, distance, timer, image) VALUES (?, ?, ?, ?)`;
    const query = db.query(sql, [uid, distance, timer, base64Image]);

    query.on('error', (err) => {
      console.log(err);
      res.status(500).send('Internal server error');
    });
  
    query.on('end', () => {
      res.status(200).send('Data tracking berhasil disimpan');
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});