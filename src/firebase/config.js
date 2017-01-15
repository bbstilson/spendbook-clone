import firebase from 'firebase';

// Initialize Firebase
const apiKey = 'AIzaSyA4B1kM57fuYQmOMPvQEcDFtipOfY_dH44';
const authDomain = 'spendbook-d0ee0.firebaseapp.com';
const databaseURL = 'https://spendbook-d0ee0.firebaseio.com';
const storageBucket = 'spendbook-d0ee0.appspot.com';
const messagingSenderId = '623051534627';

const config = { apiKey, authDomain, databaseURL, storageBucket, messagingSenderId };

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
