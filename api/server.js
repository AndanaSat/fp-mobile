const express = require("express");
const bodyParser = require("body-parser");
const { auth } = require("./firebase.js");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { async } = require("@firebase/util");
const { error } = require("console");

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

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});