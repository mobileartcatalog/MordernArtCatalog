import app from 'firebase/app';
import 'firebase/auth';

import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
} from '../config';

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
};

console.log('your api is:', apiKey);

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  // createUserWithEmailAndPassword = (email, password) =>
  //   this.auth.createUserWithEmailAndPassword(email, password);

  // signInWithEmailAndPassword = (email, password) =>
  //   this.auth.signInWithEmailAndPassword(email, password);

  // signOut = () => this.auth.signOut();

  // passwordReset = email => this.auth.sendPasswordResetEmail(email);

  // passwordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
