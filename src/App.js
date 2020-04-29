import React from 'react';
import Body from './components/body/body'
import './App.css'
import {BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions/auth'

class App extends React.Component {

  state = {

  }

  componentDidMount(){
    this.props.onTryAutoSighUp()
  }

  render(){
    return (
      <Router>
        <div className="App" >
          <Body {...this.props} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSighUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
