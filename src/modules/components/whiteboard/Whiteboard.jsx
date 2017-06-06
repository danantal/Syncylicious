import React, { Component } from "react";

import { Canvas } from "./Canvas";

export class Whiteboard extends Component {
    constructor() {
        super();
        this.onResize = this.onResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize, false);
        this.onResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize, false);
    }

    onResize() {
        this.forceUpdate();
    }

    render() {
        return (
            <Canvas width={Math.max(document.documentElement.clientWidth, window.innerWidth || 0)} height={Math.max(document.documentElement.clientHeight, window.innerHeight || 0)}/>
        );
    }
}