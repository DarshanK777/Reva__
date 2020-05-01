import React from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/auth'

class Register extends React.Component{

    state= {
        username: '',
        password1: '',
        password2: '',
        email: ''


    }

    handleSubmit = event =>{
        event.preventDefault()
        console.log(this.state)
        this.props.onAuth(this.state.username,
                        this.state.email,
                        this.state.password1,
                        this.state.password2,
                        )
        this.history.push('/')
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
        
        
    }

    componentDidMount(){
        const token = localStorage.getItem('user')
        if(token !== null){
            console.log(token)
          this.props.history.push('/')
        }
    }


    render(){
        return(
            <div className='register-container'>
                <div className="register-content">
                    <div className="register-title-bar">
                        Reva
                    </div>

                    <div className="register-title">
                        Register
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Username"
                            name='username'
                            value={this.state.username}
                            onChange={this.handleChange}
                        />        
                        <input
                            type="email"
                            className="input"  
                            placeholder="Email"
                            name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                        />  
                        <input 
                            type="password" 
                            className="input"  
                            placeholder="Password"
                            name='password1'
                            value={this.state.password1}
                            onChange={this.handleChange}
                        />  
                         <input 
                            type="password" 
                            className="input"  
                            placeholder="Password"
                            name='password2'
                            value={this.state.password2}
                            onChange={this.handleChange}
                        /> 
                        
                        <button type="submit"> Register</button> 
                    </form>
                    <div className="register-signup">
                        Already User? <Link className="link-login" to="/login/">
                            Sign In
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
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignUp(username, email, password1, password2)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)