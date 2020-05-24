import React, { useEffect, useRef, useState } from 'react'
import './detailsPage.css'
import { useSelector } from 'react-redux'
import {getPostComment, postComment, likeSystemApi, deletePost, deleteComment} from '../../utils/feedApiCalls'

const DetailsPage = (props) =>{
    
    const state = props.location.state.data.state  // hell lot of nesting gotta simplify later
    const user = state.user
    const data = props.location.state.data
    const currentUser = useSelector(state => state.user)
    const inputEl = useRef(''); 
    const [commentList, setCommentList] = useState(null)
    const [liked, setLiked ] = useState(data.liked)
    const [likes, setLikes] = useState(data.likes)

    // get post comments at first render
    const getComments = async (pk) =>{
        const comments = await getPostComment(pk)
        setCommentList(comments)
    }

    const handleOnClickLike = async (pk) =>{
        const res = await likeSystemApi(pk)
        if(res.liked){
            setLiked(true)
            setLikes(prevState => prevState + 1)
        }else{
            setLiked(false)
            if(likes !== 0){
                setLikes(prevState => prevState - 1)
            }
        }
    } 

    const handleOnClickDelete = async (postId) =>{
        const deleted = await deletePost(postId)
        if(!deleted.errors){
            props.history.push('/homefeed')
        }
        
    }

    const handleOnClickDeleteComment = async (commentId, postId) =>{
        const deleted = await deleteComment(commentId)
        if(!deleted.errors){
            getComments(postId)
        }
        
    }

    useEffect(()=>{
        getComments(state.pk)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    var d = new Date(state.posted_at);
    var n = d.toString();
    const date = n.slice(3,15)  

    const handleOnClick = async () =>{
        var comment = inputEl.current.value
        setCommentList(await postComment(state.pk, comment))
    }

    return(
        <div className="details">
           <div className="details-container">
            <div className="details-image">
                    <img src={state.image} alt=""/>
                </div>
                {
                    console.log(props.location)
                }
                <div className="details-comment-section">
                    <div className="details-header">
                        <div className='details-header-left'>
                            <img src="/images/03.jpg" alt=""></img>
                            <div className="details-user">
                                <span>
                                    {user.username}
                                </span>
                                <span>
                                    {date}
                                </span>
                            </div>
                        </div>
                        <div className="details-user-options">
                            <div className="details-likes">
                               
                                {
                                    liked ?
                                    <img src="/images/icons/heart-fill.png" onClick={() => handleOnClickLike(state.pk)} alt=""/>:
                                    <img src="/images/icons/heart-nofill.png" onClick={() => handleOnClickLike(state.pk)} alt=""/>
                                }

                                <span>
                                    {likes}
                                </span>
                            </div>
                            {
                                currentUser ?
                                    state.user.pk === currentUser.pk ?
                                    <div className='details-delete'>
                                        <img src="/images/icons/delete.png" onClick={() => handleOnClickDelete(state.pk)} alt=""/>
                                    </div> :
                                    null :
                                    null
                            }
                        </div>
                    </div>{
                        console.log(commentList)
                    }
                    
                    <div className="details-commentbox">
                        {
                            commentList ?  
                            commentList.map((value, index) =>{
                                return(
                                    <div className="details-comment" key={index}>
                                        <div className="comment-user">
                                            <img src='/images/02.jpg' alt=""/>
                                        </div>
                                        <div className="comment-data">
                                            <span> {value.comment_content} </span>
                                        </div>
                                        <div className="comment-edit">
                                            {/* <img src='/images/02.jpg' alt=""/> */}
                                            <img src='/images/icons/delete.png' alt='delete' onClick={() => handleOnClickDeleteComment(value.pk, state.pk)} style={{borderRadius : 0}} />
                                        </div>
                                    </div>
                                )
                            }) 
                            :
                         <h4> loading </h4>
                        }
                    </div>
                    <div className="details-input">
                        <div className='details-misc'>

                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        <div className="details-input-holder">
                            <input type="text" placeholder="comment here" ref={inputEl}/>
                            <button type="submit" onClick={() => handleOnClick()}>post comment</button>
                        </div>
                        
                    </div>
                </div>
           </div>
        </div>
    )
}

export default DetailsPage