import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import collection from '../pages/collection/collection';

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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get();
  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData 
      })
    } catch (error) {
       console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj)
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
}



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;