import React from 'react'
import './searchInput.css'

class SearchInput extends React.Component{
    render(){
        return(
            <div className="searchInput-container">
                <input type="text" className="input-search"/>
                <div className="searchInput-btn">
                    <img src="/images/icons/search.svg" alt="this" />
                </div>
            </div>
        )
    }
} 

export default SearchInput