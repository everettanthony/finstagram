// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVyuZpeWXuG08Ss-nKlKL7TuOeDemI_OM",
  authDomain: "finstagram-306a2.firebaseapp.com",
  projectId: "finstagram-306a2",
  storageBucket: "finstagram-306a2.appspot.com",
  messagingSenderId: "533226361567",
  appId: "1:533226361567:web:74350eada26204d1d24f6a"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(app);

export { app, db, storage, auth };