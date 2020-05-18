import React from 'react'
import './login.css'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { login } from '../../redux/actions/auth'
import Tooltip from '../tooltip/tooltip'

class Login extends React.Component{

    state= {
        username: '',
        password: ''

    }

    handleSubmit = event =>{
        event.preventDefault()
        this.props.login(this.state.username, this.state.password)
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){
   
        const {errors} = this.props
        // console.log("state",this.props.location)
        if(this.props.isAuthenticated){
            const { location } = this.props
            const { prevLoc } = location
            if (prevLoc && prevLoc.from) {
                return <Redirect  to={prevLoc.from} />
            }
            return <Redirect  to="/" />
        }

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
                        
                       <div className="login-input-holder">
                       <input 
                            type="text"
                            className="input" 
                            name="username" 
                            value={this.state.username} 
                            onChange={this.handleChange} 
                            placeholder="Username"
                        />
                         <div className="register-tooltip">
                            {
                                errors ?
                               <Tooltip error={errors.non_field_errors} />: 
                                null
                            }
                            </div> 
                       </div>

                        <div className="login-input-holder">
                        <input 
                            type="password"  
                            className="input" 
                            placeholder="Password"
                            name="password" 
                            value={this.state.password} 
                            onChange={this.handleChange}
                        />  <div className="register-tooltip">
                        {
                            errors ?
                            <Tooltip error={errors.non_field_errors} />: 
                            null
                        }
                        </div> 
                        </div>
                         
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

const mapStateToProps = state =>({
    isAuthenticated : state.isAuthenticated,
    errors : state.errors
})

export default withRouter(connect(mapStateToProps, {login})(Login))