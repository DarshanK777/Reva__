import React from 'react'
import './detailsPage.css'

const DetailsPage = (props) =>{
    
    const state = props.location.state
    const user = state.user

    var d = new Date(state.posted_at);
    var n = d.toString();
    const date = n.slice(3,15)  

    return(
        <div className="details">
           <div className="details-container">
            <div className="details-image">
                {
                    console.log(state)
                }
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
                    
                        <div className="details-comment">
                           <div className="comment-user">
                                <img src='/images/02.jpg' alt=""/>
                           </div>
                            <div className="comment-data">
                                <span> comment </span>
                            </div>
                            <div className="comment-like">
                                <img src='/images/02.jpg' alt=""/>
                           </div>
                        </div>
                    </div>
                    <div className="details-input">
                        <div className='details-misc'>

                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        <input type="text" placeholder="comment here"/>
                        
                    </div>
                </div>
           </div>
        </div>
    )
}

export default DetailsPage