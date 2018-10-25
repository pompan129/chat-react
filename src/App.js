import React, { Component } from "react";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import firebase from "./config";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
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
        rooms: this.state.rooms.concat(room)
      });
    });
    //firebase value events are always triggered last so state.rooms will be populated 
    //now if there are any rooms
    this.roomsRef.once("value", snap => {
      this.setState({ currentRoom: this.state.rooms[0] });
    });
  }

  componentWillUnmount() {
    this.roomsRef.off();
  }

  createRoom(name) {
    this.roomsRef.push({ name });
  }

  updateCurrentRoom(key) {
    const room = this.state.rooms.filter(room => room.key === key)[0];
    this.setState({ currentRoom: room });
  }

  render() {
    const currentRoom = this.state.currentRoom;
    return (
      <div className="App">
        <div>
          <RoomList
            rooms={this.state.rooms}
            createRoom={name => this.createRoom(name)}
            currentRoom={this.state.currentRoom}
            updateCurrentRoom={key => this.updateCurrentRoom(key)}
          />
          <MessageList
            firebase={firebase}
            roomTitle={currentRoom && currentRoom.name}
            roomKey={currentRoom && currentRoom.key}
          />
        </div>
      </div>
    );
  }
}

export default App;
