import React,{useEffect, useState, Fragment, useCallback, useRef} from 'react'
import './userProfile.css'
import Grid from '../grid/grid'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import { logout, loadUserOnUsername } from '../../redux/actions/auth'
import { sendFollowRequest } from '../../redux/actions/updateAccount'
import {getUserFeed, getUserNextFeed} from '../../utils/feedApiCalls'
import { ClipLoading } from '../loader/loader'


const UserProfile = (props) =>{

    // setting states
    const [loading, setLoading ] = useState(true)
    const [feed, setFeed ] = useState('')
    const [next, setNext ] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [feedLoading, setFeedLoading ] = useState(true)

    // getiing state from redux
    const {user , userData, stalkUser} = useSelector(state => state , shallowEqual)

    const dispatch = useDispatch()
    const userId = props.match.params.username ? props.match.params.username : user.username

    // scroll observer
    const observer = useRef()
    const lastGridItem = useCallback(node=>{
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries =>{
            if(entries[0].isIntersecting && hasMore){
                console.log('visible')
                loadFeed()
            }
        })
        if(node) observer.current.observe(node)

        // console.log(node)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, hasMore])  

    // load feed
    const loadFeed = async () =>{
        console.log('inside')
        setLoading(true)
        setTimeout(async ()=>{
            let data
            
            if (next!==false){
                data = await getUserNextFeed(next)
            }
            else{
                data = await getUserFeed(userId)
            }
            setFeed(prevState =>{
                return [
                    ...prevState,
                    ...data.results
                ]
            })
            setNext(
                data.next!==null ? data.next : false
            )
            setHasMore(
                data.next !== null ? true : false
            )
            setLoading(false)
            setFeedLoading(false)
        }, 5000)
    }

    useEffect(()=>{
        dispatch(loadUserOnUsername(userId))
        if(user){
            loadFeed()
        } 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return(
        <Fragment>
            {
                stalkUser ?
                <div className="profile-container">
                    <div className="profileSidebar">
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
                                     <b>{loading? 0 : feed.length}</b> posts
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
                                        loading?0:
                                         feed.length
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
                            feedLoading ?
                            <div className="userprofileloader">
                                <ClipLoading/>
                            </div> 
                                : 
                                <Grid ref={lastGridItem} load={loading} feed={feed}/> 
                        }
                    </div>
                </div>:
               <div className="userprofileloader">
                    <ClipLoading/>
                </div> 

            }
        </Fragment>
    )
}

export default UserProfile
