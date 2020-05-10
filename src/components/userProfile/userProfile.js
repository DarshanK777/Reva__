import React,{useEffect, Fragment} from 'react'
import './userProfile.css'
import Grid from '../grid/grid'
import {feedload, loadNextFeed} from '../../redux/actions/feed'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import { logout, loadUserOnUsername } from '../../redux/actions/auth'
import { sendFollowRequest} from '../../redux/actions/updateAccount'
import InfiniteScroll from "react-infinite-scroll-component";




const UserProfile = (props) =>{

    const {user , userData, stalkUser} = useSelector(state => state , shallowEqual)
    const feed = useSelector(state => state.userPosts)
    const next = useSelector(state => state.next)
    const previous = useSelector(state => state.previous)
    const count = useSelector(state => state.count)

    const dispatch = useDispatch()
    const feedloaded = useSelector(state => state.feedloaded)
    const userId = props.match.params.username ? props.match.params.username : user.username

    useEffect(()=>{
        console.log(user)
        dispatch(loadUserOnUsername(userId))
        dispatch(feedload(userId))
         
    },[])


    const handleNext = (next) =>{
        if(next !== false){
            dispatch(loadNextFeed(next))
        }    
    }
    

    return(
        <Fragment>
            {
                stalkUser ?
                <div className="profile-container">
                    <div className="profileSidebar">
                        {
                        console.log(feed)
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
                                        <b> {(userData.followers).length}</b> followers
                                    </span>
                                    <span>
                                     <b>{feedloaded? feed.length: 0}</b> posts
                                    </span>
                                    <span>  
                                    <b>{(userData.following).length}</b> following
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
                                    {(userData.followers).length}
                                    </span>
                                    <span >
                                    {
                                        feedloaded?
                                         feed.length:
                                         0
                                    }
                                    </span>
                                    <span >
                                        {
                                        (userData.following).length
                                        }
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
                                    userId === user.username ? null :
                                    user.following.some(function(o){return o["following_user_id"] === userData.pk;}) ?
                                    <button className='disabled'>
                                        Following
                                    </button >:
                                                <button onClick={
                                                    ()=>dispatch(sendFollowRequest(userData.pk))
                                                }>
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
                                <InfiniteScroll
                                    dataLength={count}
                                    next = {handleNext(next)}
                                    hasMore={next}
                                    loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
                                    endMessage={
                                        <p style={{ textAlign: "center" }}>
                                          <b>End of Posts</b>
                                        </p>
                                      }
                                >

                                    <Grid feed={feed}/>
                                
                                </InfiniteScroll>
                                :
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
