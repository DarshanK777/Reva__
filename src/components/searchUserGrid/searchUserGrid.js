import React from 'react'
import SearchUserItem from '../searchUserItem/searchUserItem'
import './serachUserGrid.css'

const SearchUserGrid = React.forwardRef((props, ref) =>{
    return(
        <div className="user-grid-search">
            {
                console.log(ref)
            }
            {
                props.data.map((value, index) =>{
                    if(props.data.length === index + 1){
                        return(
                            <SearchUserItem data={value} key={index} ref={ref}/>
                       )  
                    }
                       return(<SearchUserItem data={value} key={index} />)  
                })
            }
        </div>  
    )
})

export default SearchUserGrid