import React from 'react';
import Body from './components/body/body'
import './App.css'
import {BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import {loadUser} from './redux/actions/auth'




class App extends React.Component {

  componentDidMount(){
    this.props.onLoadUser()
  }
  

  render(){
    return (
      <Router>
        <div className="App" >
          {
            console.log('app props: ', this.props)
          }
          <Body {...this.props}/>
          
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state =>{
  return{
    user: state.user,
    state: state
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onLoadUser : () => dispatch(loadUser())
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(App);
