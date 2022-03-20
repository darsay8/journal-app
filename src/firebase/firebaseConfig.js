import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { GoogleAuthProvider } from '@firebase/auth';

const env = process.env;

const firebaseConfig = {
  apiKey: env.REACT_APP_FB_API_KEY,
  authDomain: env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: env.REACT_APP_FB_PROJECT_ID,
  storageBucket: env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_FB_APP_ID,
};

initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };
