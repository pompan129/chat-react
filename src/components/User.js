import React, { Component } from "react";

class UserAuth extends Component {
  constructor(props) {
    super(props);
    this.provider = new props.firebase.auth.GoogleAuthProvider();
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      user = user || {displayName:"Guest"}
      this.props.setUser(user);
    });
  }

  handleSignout(){
    this.props.firebase.auth().signOut();
    this.props.setUser({displayName:"Guest"});
  }

  render() {
    return (
      <div className="w3-top w3-theme-light" style={{width:"75%", marginLeft:"25%"}} >
        <div className="w3-bar w3-card w3-padding" >
          <span className="w3-display-left w3-xlarge w3-margin-left">
            { !(this.props.user.displayName === "Guest") ? `Hello ${this.props.user.displayName}` : "Guest"}
          </span>
          <span className="w3-xxlarge">Chat-React</span>
          <span className="w3-display-right w3-large w3-margin-right">
            {this.props.user.displayName === "Guest" ? (
              <button
                className="w3-button w3-hover-theme"
                onClick={() =>
                  this.props.firebase.auth().signInWithPopup(this.provider)
                }
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => this.handleSignout()}
                className="w3-button w3-hover-theme"
              >
                Sign Out
              </button>
            )}
          </span>
        </div>
      </div>
    );
  }
}

export default UserAuth;
