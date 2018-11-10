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
        <div className="w3-modal-content w3-card-4  w3-animate-zoom">
          <header className="w3-container w3-theme-d2 ">
            <span
              className="w3-button w3-display-topright"
              onClick={this.props.toggleDisplay}
            >
              &times;
            </span>
            <h2>Rename {`"${this.props.roomName}"`}</h2>
          </header>
          <form className="w3-container w3-padding-16">
            <div className="w3-row">
              <div class=" w3-col m10 s9" style={{ padding: 0 }}>
                <input
                  className="w3-input w3-border-theme"
                  type="text"
                  value={this.state.value}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="m2 s3 w3-col">
                <button
                  style={{ width: "100%" }}
                  className="w3-button  w3-theme-d2 w3-border-theme"
                  onClick={() => this.handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Modal;
