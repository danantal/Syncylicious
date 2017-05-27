import React, { Component } from "react";

import { Grid, Well } from "react-bootstrap";

export class AboutPage extends Component {
    render() {
        return (
            <Grid>
                <Well>
                    <h1>Syncylicious</h1>
                    <p>This application is a collaboration platform that makes use of several new technologies such as React, HTML5 canvas, Websockets and WebRTC.</p>
                    <p>It's purpose is to provide you with the best tool for managing projects or prototyping ideas, as well as having fun in the same time.</p>
                </Well>
            </Grid>
        );
    }
}