// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBEkBLJ6MWD4mhZx00krxsL0asHCMv4DV4",
  authDomain: "journal-app-1e64d.firebaseapp.com",
  projectId: "journal-app-1e64d",
  storageBucket: "journal-app-1e64d.appspot.com",
  messagingSenderId: "571790221041",
  appId: "1:571790221041:web:c60b328aadf4f8dcb69350",
  measurementId: "G-VXJ8707YVE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // firestore test mode

export { auth, db };
