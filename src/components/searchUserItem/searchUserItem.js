import React from 'react'
import './searchUserItem.css'

const SearchUserItem = React.forwardRef((props, ref)=>{

    const {data} = props

    return(
        <div ref={ref} className="search-user-item"  onClick={props.handleClick}>
            <div className="search-user-image">
                <img src="/images/03.jpg" alt=""/>
            </div>
            <div className="search-username">
                {data.username}
            </div>
            <div className="search-user-details"> 
            </div>
        </div>
    )
})

export default SearchUserItem