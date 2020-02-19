// const firebase = require("firebase");

// firebase.initializeApp(firebaseConfig);

const admin = require("firebase-admin");
const firebaseConfig = require("../util/firebaseConfig");

admin.initializeApp(firebaseConfig);

const db = admin.firestore();

module.exports = { admin, db };
