import React, { Component } from "react";

import { Grid, Jumbotron } from "react-bootstrap";

export class WelcomePage extends Component {
    render() {
        return (
            <Grid>
                <Jumbotron>
                    <h1>Syncylicious</h1>
                    <p>This application is a collaboration platform that makes use of several new technologies such as React, HTML5 canvas, Websockets and Node.js.</p>
                    <p>It's purpose is to provide you with a great tool for rapid prototyping ideas, as well as having fun at the same time.</p>
                </Jumbotron>
            </Grid>
        );
    }
}