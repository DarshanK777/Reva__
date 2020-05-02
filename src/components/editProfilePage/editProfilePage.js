import React from 'react'
import './editProfilePage.css'
import GenderRadioButton from '../genderRadioButton/genderRadioButton'


class EditProfilePage extends React.Component{

    state = {
        gender: 'male'
    }


    handleGender = (gender) =>{
        this.setState({
            gender 
        })
       
    }

    render(){
        return(
            <div className="editProfile-container">
                <form className="editProfile-form">
                    {
                         console.log(this.state.gender)
                    }
                    <label className="editProfile-label">First Name</label>
                    <input type="text" className="editProfile-input" />
                    <label className="editProfile-label">Last Name</label>
                    <input type="text" className="editProfile-input" />
                    <label className="editProfile-label">Username</label>
                    <input type="text" className="editProfile-input" /> 
                    <label className="editProfile-label">Bio</label>
                    <textarea rows="3" cols="2" className="editProfile-textarea" />
                    <label className="editProfile-label">Phone Number</label>
                    <input type="number" className="editProfile-input" />
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

export default EditProfilePage