import React from 'react'
import './changePasswordPage.css'
import{ connect } from 'react-redux'
import { updatePassword} from '../../redux/actions/updateAccount'

class ChangePasswordPage extends React.Component{

    state = {
        oldPassword : '',
        newPassword1 : '',
        newPassword2 : ''
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = event =>{
        event.preventDefault()
        this.props.onUpdatePassword(
            this.state.oldPassword,
            this.state.newPassword1,
            this.state.newPassword2
        )
    }
    render(){
        return(
            <div className="changePassword-container">
                <form className="changePassword-form" onSubmit={this.handleSubmit}>
                    <label className="changePassword-label">Old Password</label>
                    <input type="password" className="changePassword-input"
                        name="oldPassword" 
                        value={this.state.oldPassword} 
                        onChange={this.handleChange} />
                    <label className="changePassword-label">New Password</label>
                    <input type="password" className="changePassword-input" 
                        name="newPassword1" 
                        value={this.state.newPassword1} 
                        onChange={this.handleChange}/> 
                    <label className="changePassword-label">New Password again</label>
                    <input type="password" className="changePassword-input" 
                        name="newPassword2" 
                        value={this.state.newPassword2} 
                        onChange={this.handleChange}/> 
                    <button type="submit" className="changePassword-button" >
                        Save
                    </button>
                </form>
            </div>
        )
    } 
}

const mapDispatchProps = dispatch =>{
    return{
        onUpdatePassword : (oldPassword, newPassword1, newPassword2) => dispatch(updatePassword(oldPassword, newPassword1, newPassword2))
    }
}

export default connect(null, mapDispatchProps)(ChangePasswordPage)