import React from 'react'
import './changeEmailPage.css'

class ChangeEmailPage extends React.Component{
    render(){
        return(
            <div className="changeEmail-container">
                <form className="changeEmail-form">
                    <label className="changeEmail-label">Enter New Email</label>
                    <input type="email" className="changeEmail-input" />
                    <label className="changeEmail-label">Enter Email Again</label>
                    <input type="email" className="changeEmail-input" /> 
                    <button type="submit" className="changeEmail-button" >
                        Save
                    </button>
                </form>
            </div>
        )
    }
}

export default ChangeEmailPage 