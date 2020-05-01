import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'

const Home = () =>{
    return(
        <div className="home-container">
            <div className="home-content">
                <span>Welcome to Reva</span>

                <div className="home-links">
                   <span id="log">
                   <Link to="/login">
                        Login
                    </Link>
                   </span>
                    <span id="reg">
                    <Link to ="/register">
                        Register
                    </Link>
                    </span>

                </div>
            </div>
        </div>
    )
}

export default Home