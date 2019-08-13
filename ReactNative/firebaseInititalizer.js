import 'firebase/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { config } from './firebase-config';

// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   DATABASE_URL,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID
// } from 'react-native-dotenv';



// const config = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   databaseURL: DATABASE_URL,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID
// };

firebase.initializeApp(config);

export const f = firebase;
