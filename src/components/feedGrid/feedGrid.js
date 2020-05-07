import React,{useEffect} from 'react'
import './feedGrid.css'
import Grid from '../grid/grid'
import {  useDispatch, useSelector } from 'react-redux'
import { loadMainFeed } from '../../redux/actions/feed'




const FeedGrid = (props) =>{

    const mainFeed = useSelector(state => state.mainFeed)
    const dispatch = useDispatch()
    const mainFeedData = useSelector(state => state.mainFeedData)

    useEffect(()=>{
        console.log('trials')

        dispatch(loadMainFeed())
         
        console.log(mainFeedData)
    }, [])


    return(
        <div className='feedGrid-container'>
             {
                    mainFeed ? 
                    <Grid feed={mainFeedData}/>:
                    <h1> Loading </h1>
                }
        </div>
    )
}

export default FeedGrid