import React, { Fragment } from 'react'
import './serachUserGrid.css'

const SearchUserGrid = (props) =>{
    return(
        <div className="user-grid-search">
            {
                props.data.map((value, index) =>{
                    return(
                        <Fragment>
                            <div className="search-user-item" key={index}>
                                <div className="search-user-image">
                                    <img src="/images/03.jpg" alt=""/>
                                </div>
                                <div className="search-username">
                                    {value.username}
                                </div>
                                <div className="search-user-details">
                                    
                                </div>
                            
                            </div>       
                                <hr></hr>
                        </Fragment>
                    )
                })
            }
        
                
             
            
        </div>  
    )
}

export default SearchUserGrid