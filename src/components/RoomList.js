import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ""
    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  createRoom() {
    this.roomsRef.push({
      name: this.state.newRoomName
    });
  }
  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  render() {
    return (
      <div>
        <div>
          <h3>Room List</h3>
          <ul>
            {this.state.rooms.map(room => (
              <li key={room.key}>{room.name}</li>
            ))}
          </ul>
        </div>
        <fieldset style={{ margin: " auto", display: "inline" }}>
          <legend>Add New Room</legend>
          <form onSubmit={e => this.createRoom(e)}>
            <div style={{ display: "flex" }}>
              <label htmlFor="new-room" style={{ marginRight: "5px" }}>
                Name
              </label>
              <input
                id="new-room"
                type="text"
                value={this.state.newRoomName}
                onChange={e => this.handleChange(e)}
              />
              <input type="submit" />
            </div>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default RoomList;
