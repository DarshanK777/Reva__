
import React from 'react'
import GridItem from '../gridItem/gridItem'
import './grid.css'

const Grid = React.forwardRef((props, ref)=>{
    
    const {feed} = props
    
    return(
        <div className="grid-container">
            {
            feed.map((value, index) => {
                if(feed.length === index + 1){
                    
                    return(
                        <GridItem {...props} ref={ref}  data={value} key={index} />  
                    )}
                
                return( <GridItem {...props} data={value} key={index} /> )
            })
            }                    
        </div>
    )
})

export default Grid