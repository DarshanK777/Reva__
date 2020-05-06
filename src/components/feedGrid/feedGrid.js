import React from 'react'
import './feedGrid.css'
import Grid from '../grid/grid'
import {list} from '../../data/temporaryData'


const FeedGrid = (props) =>{
    return(
        <div className='feedGrid-container'>
            <Grid feed={list}/>
        </div>
    )
}

export default FeedGrid