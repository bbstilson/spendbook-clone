import { ref, firebaseAuth } from './config';

export function createUser (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser);
}

export function unauthenticate () {
  return firebaseAuth().signOut();
}

export function authenticate (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user);
}
