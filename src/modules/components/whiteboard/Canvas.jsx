import "./Canvas.less";

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

        // var w = canvas.width;
        // var h = canvas.height;

        // socket.emit('drawing', {
        //   x0: x0 / w,
        //   y0: y0 / h,
        //   x1: x1 / w,
        //   y1: y1 / h,
        //   color: color
        // });
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

    render() {
        return (
            <canvas width={this.props.width} height={this.props.height} ref={(canvas) => this.canvas = canvas} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} />
        );
    }
}

Canvas.defaultProps = {
    color: "black",
    width: "1650",
    height: "825"
}