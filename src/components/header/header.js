import React from 'react'
import './header.css'

const Header= ({history}) =>{
    
    const pathname = history.location.pathname

    return(
        <div className="header">
            <div className="left">
                    <img className="logo" src="/images/icons/insta.svg"  onClick={() => history.push({pathname:`/`})} alt="usasd" />
               
            </div>
            <div className="mid">
            <img className="images" src="/images/icons/user.svg" alt="usasd" />
            <img className="images" src="/images/icons/search.svg" alt="usasd" />
            <img className="images" src="/images/icons/settings.svg" alt="usasd" />
            <img className="images" src="/images/icons/add.svg" onClick={() => history.push({pathname:`/addPost/`})} alt="usasd" />


            </div>
            <div className="right">
                <img className="images" src="/images/icons/triangle.svg" alt="usasd" />

                {
                    pathname.includes('profile') ? <img className="images" src="/images/icons/edit.svg" onClick={() => history.push({pathname:`/editProfile/1/`})} alt="usasd" /> 
                :
                <img className="images" src="/images/icons/circle.svg" onClick={() => history.push({pathname:`/profile/1/`})} alt="usasd" />
                }
                
                 

            </div>
        </div>
    )
}

export default Header