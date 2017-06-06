import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";

import { Whiteboard, AboutPage, WelcomePage } from "modules/components";

export class AppViewer extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={WelcomePage} />
                <Route path='/whiteboard' component={Whiteboard} />
                <Route exact path='/about' component={AboutPage} />
            </Switch>
        );
    }
}