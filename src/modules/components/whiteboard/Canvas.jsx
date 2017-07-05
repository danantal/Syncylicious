import "./Canvas.less";
import { WebsocketService } from "services/WebsocketService";

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
        this.onMouseMove = throttle(this.onMouseMove.bind(this), 5);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = throttle(this.onTouchMove.bind(this), 5);
        this.onTouchEnd = this.onTouchEnd.bind(this);

        this.onDrawingEvent = this.onDrawingEvent.bind(this);
    }

    onRefCallback(canvas) {
        this.canvas = canvas;
    }

    componentDidMount() {
        WebsocketService.subscribe("drawing", this.onDrawingEvent)
    }

    onDrawingEvent(data) {
        var w = this.props.width;
        var h = this.props.height;
        if(data.clear) {
            this.clear();
        }
        this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, data.lineWidth);
    }
    
    clear(emit) {
        const context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if(emit) {
            WebsocketService.dispatch("drawing", {
                clear: true
            });
        }
    }

    drawLine(x0, y0, x1, y1, color, lineWidth, emit) {
        const context = this.canvas.getContext("2d");
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.stroke();

        if (!emit) { return; }

        var w = this.props.width;
        var h = this.props.height;

        WebsocketService.dispatch("drawing", {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color,
            lineWidth
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
        this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.props.color, this.props.lineWidth, true);
    }

    onMouseMove(e) {
        if (!this.drawing) {
            return;
        }

        this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.props.color, this.props.lineWidth, true);
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

        this.drawLine(this.current.x, this.current.y, e.touches[0].clientX, e.touches[0].clientY, this.props.color, this.props.lineWidth, true);
        this.current.x = e.touches[0].clientX;
        this.current.y = e.touches[0].clientY;
    }

    render() {
        return (
            <canvas width={this.props.width} height={this.props.height} 
                ref={(canvas) => this.onRefCallback(canvas)} onMouseDown={this.onMouseDown} 
                onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} 
                onMouseLeave={this.onMouseUp} onTouchStart={this.onTouchStart} 
                onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} />
        );
    }
}

Canvas.defaultProps = {
    color: "#000",
    width: "0",
    height: "0"
}