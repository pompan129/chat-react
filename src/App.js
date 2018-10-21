import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList  from "./components/RoomList"
import logo from './logo.svg';
import './App.css';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB6Pfs8QeNcEvNtfe_DhVJhgZ95VWZSy40",
    authDomain: "chat-react-16c26.firebaseapp.com",
    databaseURL: "https://chat-react-16c26.firebaseio.com",
    projectId: "chat-react-16c26",
    storageBucket: "chat-react-16c26.appspot.com",
    messagingSenderId: "954562222375"
  };
  firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}></RoomList>  
      </div>
    );
  }
}

export default App;
