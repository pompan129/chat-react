import React, { Component } from "react";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.myRef = React.createRef();
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleModalClick(e) {
    //console.log("e.target == this.myRef",e.target == this.myRef.current)
    if (e.target === this.myRef.current) {
      this.props.toggleDisplay();
    }
  }
  handleSubmit() {
    const { roomKey, renameRoom, toggleDisplay } = this.props;
    renameRoom(this.state.value, roomKey);
    toggleDisplay();
  }
  render() {
    return (
      <div
        className="w3-modal"
        style={{ display: this.props.display ? "block" : "none" }}
        ref={this.myRef}
        onClick={e => this.handleModalClick(e)}
      >
        <div className="w3-modal-content w3-card-4">
          <header className="w3-container w3-theme-d2 ">
            <span
              className="w3-button w3-display-topright"
              onClick={this.props.toggleDisplay}
            >
              &times;
            </span>
            <h2>Rename {`"${this.props.roomName}"`}</h2>
          </header>
          <div className="w3-container">
            <input
              className="w3-input"
              type="text"
              value={this.state.value}
              onChange={e => this.handleChange(e)}
            />
            <button onClick={() => this.handleSubmit()}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
