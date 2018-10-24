import React, { Component } from "react";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import "./App.css";

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
  constructor(props) {
    super(props);
    console.log("app constructor",Math.random())//todo
    this.state = {
      rooms: [],
      currentRoom: undefined
    };
    this.roomsRef = firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({
        rooms: this.state.rooms.concat(room),
        currentRoom: this.state.rooms[0]
      });
    });
    //this.setState({currentRoom: this.state.rooms[0]})
  }

  createRoom(name) {
    this.roomsRef.push({ name });
  }

  updateCurrentRoom(key){
    const room = this.state.rooms.filter(room=>room.key === key)[0]
    this.setState({currentRoom:room})
  }

  render() {
    const {currentRoom} = this.state;
    console.log("app state", this.state,currentRoom && currentRoom.name)
    return (
      <div className="App">
        <RoomList
          rooms={this.state.rooms}
          createRoom={name => this.createRoom(name)}
          currentRoom={this.state.currentRoom}
          updateCurrentRoom={key=>this.updateCurrentRoom(key)}
        />
        <MessageList  firebase={firebase} roomTitle={currentRoom && currentRoom.name} roomKey={currentRoom && currentRoom.key}/>

      </div>
    );
  }
}

export default App;
