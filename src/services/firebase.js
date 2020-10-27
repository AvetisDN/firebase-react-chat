import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDSaOy5Beiz8ti-qGWx0S9Yq6a5uoLkL1E",
    authDomain: "react-chat-38967.firebaseapp.com",
    databaseURL: "https://react-chat-38967.firebaseio.com"
}

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database;
