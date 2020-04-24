import React from 'react'
import './editAccount.css'
import EPOtions from '../editProfileOptions/editProfileOptions'
import ChangePasswordPage from '../changePasswordPage/changePasswordPage'
import EditProfilePage from '../editProfilePage/editProfilePage'
import ChangeEmailPage from '../changeEmailPage/changeEmailPage'

class EditAccount extends React.Component{

    state = {
        option: 0
    }
    

    handleSelectedOption = (option) =>{
        console.log(option)
        this.setState({
            option
        })
    }


    renderOption = () =>{
        switch(this.state.option){
            case 0:
                return  <EditProfilePage/>

            case 1:
                return <ChangePasswordPage/>

            case 2:
                return <ChangeEmailPage/>

            default :
                return  <EditProfilePage/>
        }
    }

    render(){
        return(
            <div className="editAccount-container">
                <div className="editAccount-content" >
                    <div className="editAccount-contentBox" >
                        <div className="editAccount-Options">
                            <EPOtions selectOption={this.handleSelectedOption}/>
                        </div>
                        <div className="editAccount-selected">
                            {   
                                this.renderOption()
                            }
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}

export default EditAccount