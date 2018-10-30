import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ""
    };
    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({
        messages: this.state.messages.concat(msg)
      });
    });
    this.messagesRef.on("child_removed", child  => {
      const key = child.key;
      const newMessages = this.state.messages.filter(msg=>msg.key !== key)
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

  deleteMessage(key){
    this.messagesRef.child(key).remove();
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  render() {
    const { roomKey } = this.props;
    return (
      <div
        className="w3-text-theme"
        style={{ textAlign: "left", marginLeft: "25%", paddingTop: "70px" }}
      >
        <h4 style={{ textAlign: "center" }}>{`${
          this.props.roomTitle
        } messages`}</h4>
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
                    className="w3-display-position w3-display-hover w3-button w3-hover-theme"
                    onClick={()=>this.deleteMessage(msg.key)}
                    style={{ top: "-4px", right: "-8px" }}
                  >
                    X
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
