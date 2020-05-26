
import React from 'react'
import GridItem from '../gridItem/gridItem'
import './grid.css'
import {SyncLoading} from '../loader/loader'

const Grid = React.forwardRef((props, ref)=>{
    
    const {feed} = props
    
    return(
        <div className="grid-container">
            {
            feed.map((value, index) => {
                if(feed.length === index + 1){
                    
                    return(
                        <GridItem {...props} ref={ref}  data={value} key={index}/>  
                    )}
                
                return( <GridItem {...props} data={value} key={index} /> )
            })
            } 
           
            {
               props.load ?
                <div className='feed-loader'>
                    <SyncLoading/>   
                </div>   :
                null 
            }
                           
        </div>
    )
})

export default Grid