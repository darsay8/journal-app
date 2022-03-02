import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBB270fRRVKQxPGFI6TQ4xtqT4OdnNwvHg',
  authDomain: 'journal-app-3f40c.firebaseapp.com',
  projectId: 'journal-app-3f40c',
  storageBucket: 'journal-app-3f40c.appspot.com',
  messagingSenderId: '378860588095',
  appId: '1:378860588095:web:bb67ad9dfee415b4fcfc8a',
};

initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };
