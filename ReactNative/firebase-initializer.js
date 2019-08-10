import { config } from './firebase-config';
import * as firebase from 'firebase/app';

import 'firebase/auth';

firebase.initializeApp(config);
export default firebase;
