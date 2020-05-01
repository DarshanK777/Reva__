import React from 'react'
import './feedGrid.css'
import Grid from '../grid/grid'

const FeedGrid = (props) =>{
    return(
        <div className='feedGrid-container'>
            {
                console.log(props)
            }
            <Grid/>
        </div>
    )
}

export default FeedGrid