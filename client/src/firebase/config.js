import firebase from 'firebase';

// Initialize Firebase
const apiKey = 'AIzaSyB6uvttjcrZrpooTR8giFzd8NdglxUYWEM';
const authDomain = 'balanced-594af.firebaseapp.com';
const databaseURL = 'https://balanced-594af.firebaseio.com';
const storageBucket = 'balanced-594af.appspot.com';
const messagingSenderId = '352101502046';

const config = { apiKey, authDomain, databaseURL, storageBucket, messagingSenderId };

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
