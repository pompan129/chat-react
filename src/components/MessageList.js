import React, { Component } from "react";
import Modal from "./Modal-rename-room";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: "",
      dropdownVisible: false,
      displayModal: false
    };
    this.messagesRef = this.props.firebase.database().ref("messages");
    this.dropdownMenuRef = React.createRef();
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({
        messages: this.state.messages.concat(msg)
      });
    });
    this.messagesRef.on("child_removed", child => {
      const key = child.key;
      const newMessages = this.state.messages.filter(msg => msg.key !== key);
      this.setState({
        messages: newMessages
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.newMessage === "") {
      return;
    }
    this.messagesRef.push({
      username: this.props.currentUser.displayName,
      content: this.state.newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.roomKey
    });
    this.setState({ newMessage: "" });
  }

  deleteMessage(key) {
    this.messagesRef.child(key).remove();
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  //listen for clicks outside dropdown menu
  _listener=({ target }) =>{
    if (!this.dropdownMenuRef.current.contains(target)) {
      this.handleDropdown();
    }
  }
  handleDropdown() {
    this.setState(
      ({ dropdownVisible }) => ({ dropdownVisible: !dropdownVisible }),

      () => {
        if (this.state.dropdownVisible === true) {
          document.addEventListener("click", this._listener);
        } else {
          document.removeEventListener("click", this._listener);
        }
      }
    );
  }
  /*
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }if 
  
  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }
*/
  toggleModalDisplay() {
    this.setState(({ displayModal }) => ({ displayModal: !displayModal }));
  }

  render() {
    const { roomKey, room } = this.props;
    return (
      <div
        className="w3-text-theme"
        style={{ textAlign: "left", marginLeft: "25%", paddingTop: "70px" }}
      >
        <div className="room-title w3-container">
          <h4 className="w3-text-theme w3-margin-left w3-left">
            <b>{`${room && room.name} messages`}</b>
          </h4>
          <div className="w3-right w3-dropdown-click w3-hover-theme">
            <button
              className="w3-button w3-hover-theme"
              onClick={() => this.handleDropdown()}
            >
              <i className="fa fa-cog" aria-hidden="true" />
            </button>
            <div
              ref={this.dropdownMenuRef}
              className={
                "w3-dropdown-content w3-bar-block w3-border" +
                (this.state.dropdownVisible ? " w3-show " : "")
              }
              style={{ right: "0" }}
            >
              <button
                className="w3-button w3-block w3-left-align w3-hover-theme"
                onClick={() => this.props.deleteRoom(room.key)}
              >
                <span>
                  <i
                    className="fa fa-trash w3-margin-right"
                    aria-hidden="true"
                  />
                  Delete Room
                </span>
              </button>
              <button
                className="w3-button w3-hover-theme w3-block w3-left-align"
                onClick={e => this.toggleModalDisplay()}
              >
                <span>
                  <i
                    className="fa fa-pencil w3-margin-right"
                    aria-hidden="true"
                  />
                  Rename
                </span>
              </button>
              <Modal
                display={this.state.displayModal}
                toggleDisplay={e => this.toggleModalDisplay()}
                roomName={room && room.name}
                roomKey={room && room.key}
                renameRoom={(name, key) => this.props.renameRoom(name, key)}
              />
            </div>
          </div>
        </div>
        <ul className="w3-ul w3-border" style={{ marginBottom: "45px" }}>
          {this.state.messages
            .filter(msg => msg.roomId === roomKey)
            .map(msg => (
              <li
                key={msg.key}
                className="w3-padding-small w3-hover-theme-color-l5"
              >
                <div className="w3-display-container w3-padding">
                  <button
                    className="w3-display-position w3-display-hover w3-button w3-hover-text-only-theme-l2 w3-hover-border-theme"
                    onClick={() => this.deleteMessage(msg.key)}
                    style={{ top: "-4px", right: "-8px" }}
                  >
                    <i className="fa fa-times" aria-hidden="true" />
                  </button>
                  <div className="w3-display-topleft">
                    <span className="w3-margin-right w3-large">
                      <b>{msg.username}</b>
                    </span>
                    <span>{new Date(msg.sentAt).toLocaleDateString()}</span>
                  </div>
                  <div className="w3-section">{msg.content}</div>
                </div>
              </li>
            ))}
        </ul>
        <div className="w3-bottom w3-theme-light w3-border-top">
          <form
            className="w3-padding"
            style={{ display: "flex", width: "75%" }}
            onSubmit={e => this.handleSubmit(e)}
          >
            <input
              className="w3-input w3-border"
              placeholder="Write message here....."
              type="text"
              onChange={e => this.handleChange(e)}
              value={this.state.newMessage}
            />
            <input className="w3-button  w3-theme-d2" type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default MessageList;
