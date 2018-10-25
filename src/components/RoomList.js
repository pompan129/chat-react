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
    const currentKey = currentRoom && currentRoom.key;
    return (
      <div
        className="w3-sidebar w3-bar-block w3-border-right"
        style={{ width: "25%" }}
      >
        <h3 className="w3-bar-item">Rooms</h3>
        <h4 className="w3-bar-item">{currentRoom && currentRoom.name}</h4>

        {this.props.rooms.map(room => (
          <button
            onClick={() => this.props.updateCurrentRoom(room.key)}
            key={room.key}
            className={
              (room.key === currentKey ? "w3-grey " : "") +
              "w3-bar-item w3-button"
            }
            style={{ cursor: "pointer" }}
          >{`${room.name}`}</button>
        ))}

        <fieldset
          style={{ margin: " auto", display: "inline" }}
          className="w3-bar-item w3-border"
        >
          <legend>Add New Room</legend>
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.createRoom(this.state.newRoomName);
              this.setState({ newRoomName: "" });
            }}
          >
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
