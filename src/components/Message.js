import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMsg: false,
      edit: false
    };
    this.msgRef = React.createRef();
  }

  //listen for clicks outside message
  _listener = ({ target }) => {
    if (!this.msgRef.current.contains(target)) {
      this.toggleEdit();
    }
  };

  toggleEdit() {
      
    this.setState(
      prevState => ({ edit: !prevState.edit, newMsg: this.props.msg.content }),
      () => {
        if (this.state.edit === true) {
          document.addEventListener("click", this._listener);
        } else {
          document.removeEventListener("click", this._listener);
        }
      }
    );
  }

  handleChange(e) {
    if (e.keyCode === 13) {
      this.props.editMessage(this.state.newMsg, this.props.msg.key);
      this.toggleEdit();
    }
    const value = e.target.value;
    this.setState(prevState => ({ newMsg: value }));
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.props.editMessage(this.state.newMsg, this.props.msg.key);
      this.toggleEdit();
    }
  };

  render() {
    const { msg, deleteMessage, editMessage } = this.props;
    return (
      <li key={msg.key} className="w3-padding-small w3-hover-theme-color-l5">
        <div className="w3-display-container w3-padding" ref={this.msgRef}>
          <div
            className="w3-display-position w3-display-hover"
            style={{
              top: "0",
              right: "-4px",
              borderRadius: "5px",
              border: "1px solid #ddd "
            }}
          >
            <button
              className="w3-button w3-hover-text-only-theme-l2"
              onClick={e => this.toggleEdit()}
              style={{ padding: "3px" }}
            >
              <i className="fa fa-pencil" aria-hidden="true" />
            </button>
            <button
              className="w3-button w3-hover-text-only-theme-l2"
              onClick={() => deleteMessage(msg.key)}
              style={{ padding: "3px" }}
            >
              <i className="fa fa-trash" aria-hidden="true" />
            </button>
          </div>

          <div className="w3-display-topleft">
            <span className="w3-margin-right w3-large">
              <b>{msg.username}</b>
            </span>
            <span>{new Date(msg.sentAt).toLocaleDateString()}</span>
          </div>
          {this.state.edit ? (
            <div className="w3-section w3-margin">
              <textarea
                style={{ width: "100%" }}
                className="w3-input w3-border"
                name="message"
                type="text"
                value={
                  this.state.newMsg 
                }
                onChange={e => this.handleChange(e)}
                onKeyPress={e => this.handleKeyPress(e)}
              />
              <div className="w3-bar">
                <button
                  className="w3-bar-item w3-button w3-hover-theme w3-border-theme"
                  onClick={() => {
                    editMessage(this.state.newMsg, msg.key);
                    this.toggleEdit();
                  }}
                >
                  Save
                </button>
                <button
                  className="w3-bar-item w3-button danger-hover  w3-border-theme"
                  onClick={e => this.toggleEdit()}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="w3-section">{msg.content}</div>
          )}
        </div>
      </li>
    );
  }
}

export default Message;
