import React from 'react'
import './changeEmailPage.css'
import {connect} from 'react-redux'
import {updateEmail} from '../../redux/actions/updateAccount'

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

    handleSubmit = event =>{
        event.preventDefault()

        if(this.state.newEmail1 === this.state.newEmail2){
            this.props.onUpdateEmail(
                this.state.newEmail1
            )
        }

        
    }

    render(){
        return(
            <div className="changeEmail-container">
                <form className="changeEmail-form" onSubmit={this.handleSubmit}>
                    <label className="changeEmail-label">Enter New Email</label>
                    <input type="email" className="changeEmail-input"
                        name="newEmail1" 
                        value={this.state.newEmail1} 
                        onChange={this.handleChange} />
                    <label className="changeEmail-label">Enter Email Again</label>
                    <input type="email" className="changeEmail-input"
                        name="newEmail2" 
                        value={this.state.newEmail2} 
                        onChange={this.handleChange} /> 
                    <button type="submit" className="changeEmail-button" >
                        Save
                    </button>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch =>{
    return{
        onUpdateEmail : (email) => dispatch(updateEmail(email))
    }
}
export default connect(null, mapDispatchToProps)(ChangeEmailPage) 