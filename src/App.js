import React, { Component } from "react";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import UserAuth from "./components/User";
import firebase from "./config";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      currentRoom: undefined,
      user: { displayName: "Guest" }
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
    this.roomsRef.on("child_removed", child => {
      const key = child.key;
      const newRooms = this.state.rooms.filter(room => room.key !== key);
      this.setState({
        rooms: newRooms
      });
      this.setState({ currentRoom: this.state.rooms[0] });
    });
    this.roomsRef.on("child_changed", child => {
      console.log("this.roomsRef.on(child_changed", child); //todo
      const key = child.key;
      let newRoom;
      const newRooms = this.state.rooms.map(room => {
        if (room.key === key) {
          newRoom = { ...room, name: child.val().name };
          return newRoom;
        }
        return room;
      });
      this.setState({
        rooms: newRooms,
        currentRoom: newRoom
      });
    });
  }

  componentWillUnmount() {
    this.roomsRef.off();
  }

  createRoom(name) {
    this.roomsRef.push({ name });
  }

  deleteRoom(key) {
    this.roomsRef.child(key).remove();
  }

  renameRoom(name, key) {
    this.roomsRef.child(key).update({ name });
  }

  updateCurrentRoom(key) {
    const room = this.state.rooms.filter(room => room.key === key)[0];
    this.setState({ currentRoom: room });
  }

  setUser(user) {
    this.setState({ user });
  }

  render() {
    const currentRoom = this.state.currentRoom;
    return (
      <div className="App">
        <RoomList
          rooms={this.state.rooms}
          createRoom={name => this.createRoom(name)}
          deleteRoom={key => this.deleteRoom(key)}
          currentRoom={this.state.currentRoom}
          updateCurrentRoom={key => this.updateCurrentRoom(key)}
        />
        <UserAuth
          user={this.state.user}
          firebase={firebase}
          setUser={user => {
            this.setUser(user);
          }}
        />
        <MessageList
          firebase={firebase}
          roomTitle={currentRoom && currentRoom.name}
          room={currentRoom}
          renameRoom={(name, key) => this.renameRoom(name, key)}
          deleteRoom={key => this.deleteRoom(key)}
          roomKey={currentRoom && currentRoom.key}
          currentUser={this.state.user}
        />
      </div>
    );
  }
}

export default App;
