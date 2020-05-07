import React,{useEffect, Fragment} from 'react'
import './userProfile.css'
import Grid from '../grid/grid'
import {feedload} from '../../redux/actions/feed'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import { logout, loadUserOnPk } from '../../redux/actions/auth'





const UserProfile = (props) =>{

    const {user , userData, stalkUser} = useSelector(state => state , shallowEqual)
    const feed = useSelector(state => state.userPosts)
    const dispatch = useDispatch()
    const feedloaded = useSelector(state => state.feedloaded)
    const userId = props.match.params.id ? props.match.params.id : user.pk
   
    
    useEffect(()=>{
        console.log(user)
        dispatch(loadUserOnPk(userId))
        dispatch(feedload(userId))
         
    },[])

    

    return(
        <Fragment>
            {
                stalkUser ?
                <div className="profile-container">
                    <div className="profileSidebar">
                        {
                        console.log(userData)
                    }
                        <div className="profileImage">
                            <img src='/images/03.jpg' alt="asd" />
                        </div>
                        <div className="horizontal-content">
                            <div className="topContent">
                                <span> {userData.username}</span>
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
                                <span id= "fullsname"> { userData.first_name + " " + userData.last_name }</span>
                                <span id= "username"> {userData.username} </span>
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
                                    {userData.bio}
                            </div>
                        </div>
                        <div className="misc">
                            <div className="followBtn">
                                {
                                    userId === user.pk ? null :
                                    <button>
                                        Follow
                                    </button>
                                }
                            </div>
                            <div className="logout">
                                <span onClick={
                                    () => dispatch(logout())
                                } >
                                    Logout
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="profilePosts">
                        {
                            feedloaded ?
                            <Grid feed={feed}/>:
                            <h1>loading</h1>
                        }
                    </div>
                </div>:
                <h1> loading </h1>

            }
        </Fragment>
    )
}

export default UserProfile
