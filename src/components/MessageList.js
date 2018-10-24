import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newRoomName: ""
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
  }

  render() {
    console.log("MessageList", this.props, this.state, roomKey);
    const { roomKey } = this.props;
    return (
      <div style={{ marginLeft: "25%", textAlign: 'left' }}>
        <h3>{`${this.props.roomTitle} messages`}</h3>
        <ul className="w3-ul w3-border w3-padding">
          {this.state.messages
            .filter(msg => msg.roomId === roomKey)
            .map(msg => (
              <li key={msg.key} className="w3-padding-small">
              <div className="w3-display-container w3-padding"><span className="w3-display-left"><b>{msg.username}</b></span><span className="w3-display-right">{msg.sentAt}</span></div>
              <div className="w3-section">
                 { msg.content}
              </div>
             </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default MessageList;
