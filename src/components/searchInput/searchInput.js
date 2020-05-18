import React from 'react'
import './searchInput.css'

class SearchInput extends React.Component{

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
      }

    handlePostClick = () =>{
        this.props.tab(true)
    }

    handleUserClick = () =>{
        this.props.tab(false)
    }

    handleSearchOnClick = () =>{
        var value = this.inputRef.current.value
        this.props.inputValue(value)
    }

    render(){
        
        return(
            <div className="searchInput-container">
                <input type="text" className="input-search" ref={this.inputRef}/>
                <div className="searchInput-btn">
                    <img src="/images/icons/search.svg" alt="this" onClick = {this.handleSearchOnClick} />
                </div>
                <div className="search-tabs">
                    <span onClick={this.handlePostClick}>
                        Posts
                    </span>
                    <span onClick={this.handleUserClick}>
                        Users
                    </span>
                </div>
            </div>
        )
    }
} 

export default SearchInput