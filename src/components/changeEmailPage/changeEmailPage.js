import React from 'react'
import './changeEmailPage.css'
import { updateEmail } from '../../utils/updateSettings'
import Tooltip from '../tooltip/tooltip'


class ChangeEmailPage extends React.Component{

    state = {
        newEmail1: '',
        newEmail2: ''
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = async (event) =>{
        event.preventDefault()

        if(this.state.newEmail1 === this.state.newEmail2){
            const res = await updateEmail(
                this.state.newEmail1
            )
            
            this.setState({
                errors : res.errors
            })
        }

        
    }

    render(){
        const {errors} =  this.state
        return(
            <div className="changeEmail-container">
                <form className="changeEmail-form" onSubmit={this.handleSubmit}>
                    <div className='emailPage-holder'>
                        <label className="changeEmail-label">Enter New Email</label>
                        <input type="email" className="changeEmail-input"
                            name="newEmail1" 
                            value={this.state.newEmail1} 
                            onChange={this.handleChange} />
                        <div className="email-tooltip">
                            {
                                errors ?
                                <Tooltip error={errors.email} />: 
                                null
                            }
                        </div>   
                    </div>
                        
                    <div className="emailPage-holder">
                        <label className="changeEmail-label">Enter Email Again</label>
                        <input type="email" className="changeEmail-input"
                            name="newEmail2" 
                            value={this.state.newEmail2} 
                            onChange={this.handleChange} /> 
                        <div className="email-tooltip">
                            {
                                errors ?
                                <Tooltip error={errors.email} />: 
                                null
                            }
                        </div>   
                    </div>
                    <button type="submit" className="changeEmail-button" >
                        Save
                    </button>
                </form>
            </div>
        ) 
    }
}



export default ChangeEmailPage