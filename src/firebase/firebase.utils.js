import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
  apiKey: "AIzaSyBMIkZGefMCkrYJmkdLTxGrhAf9Ki3d2rw",
  authDomain: "elite-db-9b615.firebaseapp.com",
  databaseURL: "https://elite-db-9b615.firebaseio.com",
  projectId: "elite-db-9b615",
  storageBucket: "elite-db-9b615.appspot.com",
  messagingSenderId: "19847123809",
  appId: "1:19847123809:web:ea665b075e82108a1eab20",
  measurementId: "G-NXWWNKT6H0"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;