import React, {Component} from "react";

import {Canvas} from "./Canvas";

import {Row, Col} from "react-bootstrap";

export class Whiteboard extends Component {
    render() {
        return (
            <Row>
                <Col md={12}>
                    <Canvas />
                </Col>
            </Row>
        );
    }
}