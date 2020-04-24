import React from 'react'
import './register.css'
import { Link } from 'react-router-dom'

class Register extends React.Component{

    handleValidation = () =>{
        
    }


    handleRegister = (e) =>{
        e.preventDefault()
        return this.props.history.push('/')
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

                    <form onSubmit={this.handleRegister}>
                        <input type="text" placeholder="Username"/>      
                        <input type="text" placeholder="Password"/>  
                        <input type="text" placeholder="Email"/>  
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

export default Register