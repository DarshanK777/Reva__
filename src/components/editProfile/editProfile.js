import React from 'react'
import './editProfile.css'
import EPOtions from '../editProfileOptions/editProfileOptions'


class EditProfile extends React.Component{
    render(){
        return(
            <div className="editProfile-container">
                <div className="editProfile-content" >
                    <div className="editProfile-contentBox" >
                        <div className="editProfile-Options">
                            <EPOtions/>
                        </div>
                        <div className="editProfile-selected">
                            test2
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProfile