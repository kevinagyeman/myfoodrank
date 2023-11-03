import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB9OClSLIpedDaMTu6oSnkI4--dmlkuxbk',
  authDomain: 'myfoodrank-db.firebaseapp.com',
  projectId: 'myfoodrank-db',
  storageBucket: 'myfoodrank-db.appspot.com',
  messagingSenderId: '664512226873',
  appId: '1:664512226873:web:ac2252347bb9c6b6b7cfe8',
  measurementId: 'G-XEF3WPG3YN',
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db: Firestore = getFirestore(app);
export const auth = getAuth(app);
