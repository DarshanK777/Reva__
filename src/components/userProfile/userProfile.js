import React, { useEffect } from 'react'
import './userProfile.css'
import Grid from '../grid/grid'
import {loadUser} from '../../redux/actions/auth'
import {connect, useSelector, useDispatch} from 'react-redux'
import { logout } from '../../redux/actions/auth'

const UserProfile = () =>{

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log(user)
    const name = user.first_name + " " + user.last_name

    return(
        <div className="profile-container">
            <div className="profileSidebar">
                {
                    console.log(user)
                }
                <div className="profileImage">
                    <img src='/images/03.jpg' alt="asd" />
                </div>
                <div className="horizontal-content">
                    <div className="topContent">
                        <span> {user.username}</span>
                        <div className="followBtn">
                              <button>
                                fllw
                                </button>          
                        </div>
                    </div>
                    <div className="botContent">
                        <div className="insights">
                            <span>
                                <b>3</b> followers
                            </span>
                            <span>
                                <b>3</b> posts
                            </span>
                            <span>  
                            <b>3</b> following
                            </span>
                        </div>
                        <div className="fullName">
                            FullName
                        </div>
                        <div className="bio">
                            
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a 
                            galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                            but also the leap into electronic typesetting, remaining essentially unchanged.
                            
                        </div>
                    </div>
                </div>
                <div className="profileContent">
                    

                    <div className="profileContentDetails">
                        <span id= "fullsname"> {name}</span>
                        <span id= "username"> {user.username} </span>
                    </div>
                    <div className="profileContentSubDetails">
                        <div className="subInfoDetails">
                            <span >
                                Followers
                            </span>
                            <span >
                                Posts
                            </span>
                            <span >
                                Following
                            </span>
                        </div>
                        <div className="subInfoCounts">
                            <span >
                                52
                            </span>
                            <span >
                                2
                            </span>
                            <span >
                                5
                            </span>
                        </div>
                    </div>
                    <div className="bio">
                            {user.bio}
                    </div>
                </div>
                <div className="misc">
                    <div className="followBtn">
                        <button>
                            Follow
                        </button>
                    </div>
                    <div className="logout">
                        <span onClick={
                            ()=>dispatch(logout())
                        } >
                            Logout
                        </span>
                    </div>
                </div>
            </div>
            <div className="profilePosts">
                <Grid/>
            </div>
        </div>
    )
}

export default UserProfile