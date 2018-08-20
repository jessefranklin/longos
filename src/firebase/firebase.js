import * as firebase from 'firebase';

const config = {
    // apiKey: process.env.FIREBASE_API_KEY,
    // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
    // projectId: process.env.FIREBASE_PROJECT_ID,
    // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    apiKey: "AIzaSyB3FoYGdGMv4542Bw4Q-6psUSnF968UCUc",
    authDomain: "longos-e2aec.firebaseapp.com",
    databaseURL: "https://longos-e2aec.firebaseio.com",
    projectId: "longos-e2aec",
    storageBucket: "longos-e2aec.appspot.com",
    messagingSenderId: "73781284208"
};

firebase.initializeApp(config);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default} ;