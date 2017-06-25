import React, { Component } from "react";

import {Well, Button, FormControl, FormGroup, ControlLabel} from "react-bootstrap";
import {WebsocketService} from "services/WebsocketService";

import {Canvas} from "./Canvas";

export class Whiteboard extends Component {
    constructor(props) {
        super(props);
        this.onCreateRoomClicked = this.onCreateRoomClicked.bind(this);
        this.onJoinRoomClicked = this.onJoinRoomClicked.bind(this);
        this.onResize = this.onResize.bind(this);
        this.state = {roomId: "", connected: false};
    }

    componentDidMount() {
        WebsocketService.subscribe("roomJoined", () => {
            this.setState({connected: true});
        });
        const roomId = this.props.match.params.roomId;
        if(roomId != null) {
            WebsocketService.joinRoom(roomId);
        }  

        window.addEventListener('resize', this.onResize, false);
        this.onResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize, false);
    }

    onResize() {
        this.forceUpdate();
    }

    onCreateRoomClicked() {
        const roomId = WebsocketService.createRoom();
        this.props.history.push(`/whiteboard/${roomId}`);
    }

    onJoinRoomClicked() {
        const {roomId} = this.state;
        WebsocketService.joinRoom(roomId);
        this.props.history.push(`/whiteboard/${roomId}`);
    }

    render() {
        if(this.props.match.params.roomId == null || this.state.connected === false) {
            return (
                <Well className="room-buttons">
                    {this.props.match.params.roomId != null && this.state.connected === false ? <div>Room "{this.props.match.params.roomId}" does not exist!</div> : null}
                    <Button bsSize="large" bsStyle="primary" block onClick={this.onCreateRoomClicked}>Create new room</Button>
                    <div className="separator">or</div>
                    <FormGroup>
                        <ControlLabel>Room</ControlLabel>
                        <FormControl value={this.state.roomId} onChange={(e) => this.setState({roomId: e.target.value})} />
                    </FormGroup>
                    <Button bsSize="large" bsStyle="primary" block onClick={this.onJoinRoomClicked}>Join existing room</Button>
                </Well>
            );
        }

        return (
            <Canvas width={Math.max(document.documentElement.clientWidth, window.innerWidth || 0)} 
                height={Math.max(document.documentElement.clientHeight, window.innerHeight || 0)} />
        );
    }
}