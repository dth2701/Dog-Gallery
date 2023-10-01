import firebase from 'firebase/app'
import 'firebase/auth';
let firebaseConfig = {
    apiKey: "AIzaSyAP0pvL7g4Y2RmtKF4XjyoDzk3lUl0IA2w",
    authDomain: "chat-realtime-d3848.firebaseapp.com",
    projectId: "chat-realtime-d3848",
    storageBucket: "chat-realtime-d3848.appspot.com",
    messagingSenderId: "697139109397",
    appId: "1:697139109397:web:d293e4e016ba0a4c7db81c"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();

export {auth} ;
export default firebase ;