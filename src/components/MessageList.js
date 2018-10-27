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
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.newMessage,this.props.currentUser)
    if(this.state.newMessage === ""){return}
    this.messagesRef.push({ 
      username: this.props.currentUser.displayName,
      content: this.state.newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.roomKey,
     });
     this.setState({newMessage:""})
  }

  handleChange(e){
      this.setState({newMessage:e.target.value})
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
        <ul className="w3-ul w3-border w3-padding">
          {this.state.messages
            .filter(msg => msg.roomId === roomKey)
            .map(msg => (
              <li key={msg.key} className="w3-padding-small">
                <div className="w3-display-container w3-padding">
                  <span className="w3-display-left">
                    <b>{msg.username}</b>
                  </span>
                  <span className="w3-display-right">
                    {new Date(msg.sentAt).toUTCString()}
                  </span>
                </div>
                <div className="w3-section">{msg.content}</div>
              </li>
            ))}
        </ul>
        <div className="w3-bottom w3-theme-light w3-border-top">
          <form className="w3-padding" style={{ display: "flex", width: "75%" }} onSubmit={e=>this.handleSubmit(e)}>
            <input
              className="w3-input w3-border"
              placeholder="Write message here....."
              type="text"
              onChange={e=>this.handleChange(e)}
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
