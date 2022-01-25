import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAmimLwr0Zj7GMUBeidBHturv9ZVQEvhaM",
    authDomain: "crwn-db-5d69f.firebaseapp.com",
    projectId: "crwn-db-5d69f",
    storageBucket: "crwn-db-5d69f.appspot.com",
    messagingSenderId: "404186924715",
    appId: "1:404186924715:web:bd5285839c81329cba99ee"
};

firebase.initializeApp( firebaseConfig )

export const auth = firebase.auth()
export const firestore = firebase.firestore()


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( { prompt: 'select_account' } );

export const SignInWithGoogle = () => auth.signInWithPopup( provider );

export default firebase