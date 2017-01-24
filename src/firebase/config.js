import firebase from 'firebase';

// Initialize Firebase
const apiKey = process.env.FB_API_KEY;
const authDomain = process.env.FB_AUTH_DOMAIN;
const databaseURL = process.env.FB_DATABASE_URL;
const storageBucket = process.env.FB_STORAGE_BUCKET;
const messagingSenderId = process.env.FB_SENDER_ID;

const config = { apiKey, authDomain, databaseURL, storageBucket, messagingSenderId };

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
