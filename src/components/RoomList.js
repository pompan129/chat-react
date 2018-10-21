import React, { Component } from 'react';
import { link } from 'fs';


class RoomList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms:[]
        }
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }
    
    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
          const room = snapshot.val();
          room.key = snapshot.key;
          console.log(snapshot);
          this.setState({ rooms: this.state.rooms.concat( room) });
        });
        
      }

      render(){
          console.log("rooms:",this.state.rooms)
          return <div>
              <ul>
                {this.state.rooms.map(room=><li key={room.key}>{room.name}</li>)}
              </ul>
          </div>
      }

}

export default RoomList;