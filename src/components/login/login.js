import React from 'react'
import './login.css'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { login } from '../../redux/actions/auth'

class Login extends React.Component{

    state= {
        username: '',
        password: ''

    }

    handleSubmit = event =>{
        event.preventDefault()
        console.log(this.state)
        this.props.login(this.state.username, this.state.password)
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){
        // console.log("state",this.props.location)
        if(this.props.isAuthenticated){
            const { location } = this.props
            const { prevLoc } = location
            console.log("state",this.props.location)

            if (prevLoc && prevLoc.from) {
                return <Redirect  to={prevLoc.from} />
            }
            return <Redirect  to="/" />
        }

        // if(this.props.isAuthenticated){
        //     const { location } = this.props;
        //     const { history } = this.props
        //     const { prevLoc } = location;
        //     if (prevLoc && prevLoc.from) {
        //     history.replace(prevLoc.from);
        //     }
        //     // else go to home
        //     else {
        //     history.replace('/');
        //     }
        // }

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

const mapStateToProps = state =>({
    isAuthenticated : state.isAuthenticated
})

export default withRouter(connect(mapStateToProps, {login})(Login))