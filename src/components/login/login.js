import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as  actions from '../../store/actions/auth'

class Login extends React.Component{

    state= {
        username: '',
        password: ''

    }

    handleSubmit = event =>{
        event.preventDefault()
        console.log(this.state)
        this.props.onAuth(this.state.username, this.state.password)
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
        
        
    }

    render(){
        return(
            <div className='login-container'>
                <div className="login-content">
                    <div className="login-title-bar">
                        Reva
                    </div>

                    <div className="login-title">
                        Login
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="text"
                            className="input" 
                            name="username" 
                            value={this.state.username} 
                            onChange={this.handleChange} 
                            placeholder="Username"
                        />

                        <input 
                            type="password"  
                            className="input" 
                            placeholder="Password"
                            name="password" 
                            value={this.state.password} 
                            onChange={this.handleChange}
                        />  
                         
                        <button> Login</button> 
                    </form>
                    <div className="login-signup">
                        New? <Link className="link-login" to="/register/">
                            Sign Up
                        </Link>

                    </div>
                      
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)