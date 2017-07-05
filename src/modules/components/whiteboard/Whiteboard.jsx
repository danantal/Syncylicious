import React, { Component } from "react";

import { Well, Button, FormControl, FormGroup, ControlLabel } from "react-bootstrap";
import { WebsocketService } from "services/WebsocketService";

import { Canvas } from "./Canvas";
import { ColorPicker } from "modules/components/color-picker/ColorPicker";
import { ToolPicker } from "modules/components/tool-picker/ToolPicker";
import { Toolbar } from "modules/components/toolbar/Toolbar";

const colors = ["black", "blue", "purple", "green", "yellow", "red", "white"]
const tools = ["free-hand"];

export class Whiteboard extends Component {
    constructor(props) {
        super(props);
        this.onCreateRoomClicked = this.onCreateRoomClicked.bind(this);
        this.onJoinRoomClicked = this.onJoinRoomClicked.bind(this);
        this.onResize = this.onResize.bind(this);
        this.selectColor = this.selectColor.bind(this);
        this.onLineWidthChange = this.onLineWidthChange.bind(this);
        this.state = { roomId: "", connected: false, selectedColor: colors[0], lineWidth: 2 };
    }

    componentDidMount() {
        WebsocketService.subscribe("roomJoined", () => {
            this.setState({ connected: true });
        });
        const roomId = this.props.match.params.roomId;
        if (roomId != null) {
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
        const { roomId } = this.state;
        WebsocketService.joinRoom(roomId);
        this.props.history.push(`/whiteboard/${roomId}`);
    }

    selectColor(selectedColor) {
        this.setState({ selectedColor });
    }

    onLineWidthChange(value) {
        this.setState({lineWidth: value});
    }

    render() {
        if (this.props.match.params.roomId == null || this.state.connected === false) {
            return (
                <Well className="room-buttons">
                    {this.props.match.params.roomId != null && this.state.connected === false ? <div>Room "{this.props.match.params.roomId}" does not exist!</div> : null}
                    <Button bsSize="large" bsStyle="primary" block onClick={this.onCreateRoomClicked}>Create new room</Button>
                    <div className="separator">or</div>
                    <FormGroup>
                        <ControlLabel>Room</ControlLabel>
                        <FormControl value={this.state.roomId} onChange={(e) => this.setState({ roomId: e.target.value })} />
                    </FormGroup>
                    <Button bsSize="large" bsStyle="primary" block onClick={this.onJoinRoomClicked}>Join existing room</Button>
                </Well>
            );
        }

        return (
            <div>
                <Canvas ref={(canvas) => this.canvas = canvas} width={Math.max(document.documentElement.clientWidth, window.innerWidth || 0)}
                    height={Math.max(document.documentElement.clientHeight, window.innerHeight || 0)}
                    color={this.state.selectedColor} lineWidth={this.state.lineWidth} />
                <Toolbar>
                    <ToolPicker tools={tools} onLineWidthChange={this.onLineWidthChange} lineWidth={this.state.lineWidth} />
                    <ColorPicker colors={colors} selectColor={this.selectColor} selectedColor={this.state.selectedColor} />
                    <ClearButton clear={() => {this.canvas && this.canvas.clear(true)}} />
                </Toolbar>
            </div>
        );
    }
}

const ClearButton = (props) => (<Button bsSize="small" bsStyle="primary" style={{width: 30, padding: 5}} onClick={props.clear}>X</Button>)