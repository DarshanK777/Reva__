import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'

class Login extends React.Component{
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

                    <form>
                        <input type="text" placeholder="Username"/>      
                        <input type="text" placeholder="Password"/>  
                        <button > Login</button> 
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

export default Login