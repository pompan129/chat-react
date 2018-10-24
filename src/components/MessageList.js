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
        messages: this.state.messages.concat(msg),
      });
    });
  }

  createMessage() {
    const now = new Date(Date.now());
    this.messagesRef.push({
        username: "max",
        content: `this is a ${this.props.roomTitle} message from ` + now.toString().split(" ").slice(0,5).join(" "),
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.roomKey
    });
  }

  render() {
      console.log("MessageList",this.props,this.state, roomKey)
      const {roomKey} = this.props;
    return (
      <div>
        <h3>{`${this.props.roomTitle} messages`}</h3>
        <ul>
          {this.state.messages.filter(msg=>msg.roomId === roomKey).map(msg => (
            <li key={msg.key}>{`${msg.username} msg:${msg.content} roomID:${msg.roomId}`}</li>
          ))}
        </ul>
        <button onClick={()=>this.createMessage()}>make message</button>
      </div>
    );
  }
}

export default MessageList;
