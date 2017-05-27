import React, { Component } from "react";

import { Navbar, Nav, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export class AppHeader extends Component {

    render() {
        return (
            <div className="app-header">
                <Navbar collapseOnSelect >
                    <Navbar.Header>
                        <Navbar.Brand>
                            <NavLink to="/">Syncylicious</NavLink>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to="/whiteboard">
                                <NavItem>Whiteboard</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/about">
                                <NavItem>About</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}