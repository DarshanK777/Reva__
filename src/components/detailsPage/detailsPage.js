import React, { useEffect, useRef } from 'react'
import './detailsPage.css'
import {getPostComments, postComments} from '../../redux/actions/feed'
import { useDispatch, useSelector } from 'react-redux'

const DetailsPage = (props) =>{
    
    const state = props.location.state
    const user = state.user
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments)
    const inputEl = useRef('');

    useEffect(()=>{
        dispatch(getPostComments(state.pk))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    var d = new Date(state.posted_at);
    var n = d.toString();
    const date = n.slice(3,15)  

    const handleOnClick = () =>{
        var comment = inputEl.current.value
        dispatch(postComments(state.pk, comment))
    }

    return(
        <div className="details">
           <div className="details-container">
            <div className="details-image">
               
                    <img src={state.image} alt=""/>
                </div>

                <div className="details-comment-section">
                    <div className="details-header">
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
                    
                    <div className="details-commentbox">
                        {
                            comments ?  
                            comments.map((value, index) =>{
                                return(
                                    <div className="details-comment" key={index}>
                                        <div className="comment-user">
                                            <img src='/images/02.jpg' alt=""/>
                                        </div>
                                        <div className="comment-data">
                                            <span> {value.comment_content} </span>
                                        </div>
                                        <div className="comment-like">
                                            <img src='/images/02.jpg' alt=""/>
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