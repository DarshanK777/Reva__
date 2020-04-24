import React from 'react';
import Body from './components/body/body'
import './App.css'
import {BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Body/>
      </div>
    </Router>
  );
}

export default App;
