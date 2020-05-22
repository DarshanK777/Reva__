import React from 'react'
import './changePasswordPage.css'
import {updatePassword} from '../../utils/updateSettings'
import Tooltip from '../tooltip/tooltip'


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

    handleSubmit = async (event) =>{
        event.preventDefault()
        const res = await updatePassword(
            this.state.oldPassword,
            this.state.newPassword1,
            this.state.newPassword2 
        )
        this.setState({
            errors : res.errors
        })
    }
    render(){
        const {errors} = this.state

        return(
            <div className="changePassword-container">
                <form className="changePassword-form" onSubmit={this.handleSubmit}>
                    <div className="passwordPage-holder">
                        {
                            console.log(errors)
                        }
                        <label className="changePassword-label">Old Password</label>
                        <input type="password" className="changePassword-input"
                            name="oldPassword" 
                            value={this.state.oldPassword} 
                            onChange={this.handleChange} />

                        <div className="password-tooltip">
                            {
                                errors ?
                                <Tooltip error={errors.old_password} />: 
                                null
                            }
                        </div>      
                    </div>
                    <div className="passwordPage-holder">
                        <label className="changePassword-label">New Password</label>
                        <input type="password" className="changePassword-input" 
                            name="newPassword1" 
                            value={this.state.newPassword1} 
                            onChange={this.handleChange}/> 
                        <div className="password-tooltip">
                            {
                                errors ?
                                errors.old_password?
                                <Tooltip error="invalid Password" />: 
                                <Tooltip error={errors.new_password1} />: 
                                null
                            }
                        </div>
                    </div>
                    <div className="passwordPage-holder">
                        <label className="changePassword-label">New Password again</label>
                        <input type="password" className="changePassword-input" 
                            name="newPassword2" 
                            value={this.state.newPassword2} 
                            onChange={this.handleChange}/> 
                        <div className="password-tooltip">
                        {
                                errors ?
                                errors.old_password?
                                <Tooltip error="invalid Password" />: 
                                <Tooltip error={errors.new_password2} />: 
                                null
                            }
                        </div>
                        
                    </div>
                    <button type="submit" className="changePassword-button" >
                        Save
                    </button>
                </form>
            </div>
        )
    } 
}



export default ChangePasswordPage