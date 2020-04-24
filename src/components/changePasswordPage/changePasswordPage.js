import React from 'react'
import './changePasswordPage.css'

class ChangePasswordPage extends React.Component{
    render(){
        return(
            <div className="changePassword-container">
                <form className="changePassword-form">
                    <label className="changePassword-label">Old Password</label>
                    <input type="password" className="changePassword-input" />
                    <label className="changePassword-label">New Password</label>
                    <input type="password" className="changePassword-input" /> 
                    <label className="changePassword-label">New Password again</label>
                    <input type="password" className="changePassword-input" />
                    <button type="submit" className="changePassword-button" >
                        Save
                    </button>
                </form>
            </div>
        )
    }
}

export default ChangePasswordPage