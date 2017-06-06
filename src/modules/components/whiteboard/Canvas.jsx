import "./Canvas.less";
import io from "socket.io-client";

import React, { Component } from "react";

const throttle = (callback, delay) => {
    let previousCall = new Date().getTime();
    return function () {
        let time = new Date().getTime();

        if ((time - previousCall) >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
        }
    };
}

export class Canvas extends Component {
    constructor() {
        super();
        this.drawing = false;
        this.current = {};

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = throttle(this.onMouseMove.bind(this), 10);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = throttle(this.onTouchMove.bind(this), 10);
        this.onTouchEnd = this.onTouchEnd.bind(this);

        this.onDrawingEvent = this.onDrawingEvent.bind(this);
    }

    onRefCallback(canvas) {
        this.canvas = canvas;
    }

    componentDidMount() {
        const port = "5000";
        const uri = window.location.protocol + "//" + window.location.hostname + ":" + port;
        this.socket = io(uri);
        this.socket.on('drawing', this.onDrawingEvent);
    }    

    onDrawingEvent(data) {
        var w = this.props.width;
        var h = this.props.height;
        this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }

    drawLine(x0, y0, x1, y1, color, emit) {
        const context = this.canvas.getContext("2d");
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();

        if (!emit) { return; }

        var w = this.props.width;
        var h = this.props.height;

        this.socket.emit('drawing', {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color
        });
    }

    onMouseDown(e) {
        this.drawing = true;
        this.current.x = e.clientX;
        this.current.y = e.clientY;
    }

    onMouseUp(e) {
        if (!this.drawing) {
            return;
        }

        this.drawing = false;
        this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.props.color, true);
    }

    onMouseMove(e) {
        if (!this.drawing) {
            return;
        }

        this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);
        this.current.x = e.clientX;
        this.current.y = e.clientY;
    }

    onTouchStart(e) {
        e.preventDefault();

        this.drawing = true;
        this.current.x = e.touches[0].clientX;
        this.current.y = e.touches[0].clientY;
    }

    onTouchEnd(e) {
        e.preventDefault();

        if (!this.drawing) {
            return;
        }

        this.drawing = false;
    }

    onTouchMove(e) {
        e.preventDefault();

        if (!this.drawing) {
            return;
        }

        this.drawLine(this.current.x, this.current.y, e.touches[0].clientX, e.touches[0].clientY, this.current.color, true);
        this.current.x = e.touches[0].clientX;
        this.current.y = e.touches[0].clientY;
    }

    render() {
        return (
            <canvas width={this.props.width} height={this.props.height} ref={(canvas) => this.onRefCallback(canvas)} 
                onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} onMouseLeave={this.onMouseUp}
                onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} />
        );
    }
}

Canvas.defaultProps = {
    color: "black",
    width: "1680",
    height: "100"
}