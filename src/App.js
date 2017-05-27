import React, { Component } from 'react';
import './App.css';

import { Button } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button bsSize="large" bsStyle="primary">
          Whiteboard
        </Button>
      </div>
    );
  }
}

export default App;
