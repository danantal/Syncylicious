import React, { Component } from 'react';
import './App.less';

import {AppHeader, AppViewer} from "./modules/components";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppViewer />
      </div>
    );
  }
}

export default App;
