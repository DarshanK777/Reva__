import React from 'react'
import './editProfilePage.css'
import GenderRadioButton from '../genderRadioButton/genderRadioButton'
import {connect} from 'react-redux'
import { updateUserData } from '../../utils/updateSettings'

class EditProfilePage extends React.Component{

    state = {
        gender: 'male',  // add this field to backend
        firstName: this.props.user.first_name,
        lastName:  this.props.user.last_name,
        userName:  this.props.user.username,
        bio:  this.props.user.bio,
    }


    handleGender = (gender) =>{
        this.setState({
            gender 
        })
       
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = async(event) =>{
        event.preventDefault()
        const result = await updateUserData(
            this.state.userName,
            this.state.firstName,
            this.state.lastName,
            this.state.bio
        )
        console.log(result) 
    }

    render(){
        return(
            <div className="editProfile-container">
                <form className="editProfile-form" onSubmit={this.handleSubmit}>
                    <label className="editProfile-label">First Name</label>
                    <input 
                        type="text" 
                        className="editProfile-input"
                        name="firstName" 
                        value={this.state.firstName} 
                        onChange={this.handleChange}   />
                    <label className="editProfile-label">Last Name</label>
                    <input 
                        type="text" 
                        className="editProfile-input" 
                        name="lastName" 
                        value={this.state.lastName} 
                        onChange={this.handleChange}  />
                    
                    <label className="editProfile-label">Username</label>
                    <input
                        type="text" 
                        className="editProfile-input"
                        name="userName" 
                        value={this.state.userName} 
                        onChange={this.handleChange} 
                         /> 

                    <label className="editProfile-label">Bio</label>
                    <textarea rows="3" cols="2" className="editProfile-textarea" 
                            name="bio" 
                            value={this.state.bio} 
                            onChange={this.handleChange} 
                            />
                    <label className="editProfile-label">Gender</label>
                    <GenderRadioButton gender={this.handleGender} selected={this.state.gender}/>

                    <button type="submit" className="editProfile-button" style={{justifySelf: 'right', gridColumn: '2'}}>
                        Save
                    </button>
                </form>         
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        user: state.user
    }
}

// const mapDispatchToProps = dispatch =>{
//     return{
//         onUpdateUserData : (username,firstname, lastname, bio) => dispatch(updateUserData(username,firstname, lastname, bio))
//     }
// }

export default connect(mapStateToProps)(EditProfilePage)