import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRoomName: ""
    };
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  render() {
    const { currentRoom } = this.props;
    const currentKey= currentRoom && currentRoom.key;
    return (
      <div
        className="w3-sidebar w3-light-grey w3-bar-block"
        style={{ width: "25%" }}
      >
        <div>
          <h3>Rooms</h3>
          <h3>{currentRoom && currentRoom.name}</h3>
          <ul className="w3-ul w3-border">
            {this.props.rooms.map(room => (
              <li
                onClick={() => this.props.updateCurrentRoom(room.key)}
                key={room.key}
                className={room.key === currentKey?"w3-grey":""}
                style={{ cursor: "pointer"}}
              >{`${room.name}`}</li>
            ))}
          </ul>
        </div>
        <fieldset style={{ margin: " auto", display: "inline" }}>
          <legend>Add New Room</legend>
          <form onSubmit={e => this.props.createRoom(this.state.newRoomName)}>
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
