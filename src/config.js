
import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyB6Pfs8QeNcEvNtfe_DhVJhgZ95VWZSy40",
    authDomain: "chat-react-16c26.firebaseapp.com",
    databaseURL: "https://chat-react-16c26.firebaseio.com",
    projectId: "chat-react-16c26",
    storageBucket: "chat-react-16c26.appspot.com",
    messagingSenderId: "954562222375"
  };
  firebase.initializeApp(config);

  export default firebase;
