import React,{useEffect} from 'react'
import './feedGrid.css'
import Grid from '../grid/grid'
import {  useDispatch, useSelector } from 'react-redux'
import { loadMainFeed, loadNextMainFeed } from '../../redux/actions/feed'
import InfiniteScroll from "react-infinite-scroll-component";



const FeedGrid = (props) =>{

    const mainFeed = useSelector(state => state.mainFeed)
    const dispatch = useDispatch()
    const mainFeedData = useSelector(state => state.mainFeedData)
    const mainNext = useSelector(state => state.mainNext)
    // const mainPrevious = useSelector(state => state.mainPrevious)
    const mainCount = useSelector(state => state.mainCount)
    console.log(mainNext)

    useEffect(()=>{
    
        if(mainNext!==false){
        dispatch(loadMainFeed())
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    const handleNext = (next) =>{
        if(next !== false){
            dispatch(loadNextMainFeed(next))
        }    
    }

    return(
        <div className='feedGrid-container'> 
             {
                    mainFeed ? 
                    <InfiniteScroll
                        dataLength={mainCount}
                        next = {handleNext(mainNext)}
                        hasMore={mainNext}
                        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center", bottom: 0 }}>
                                
                            </p>
                            }
                                >

                                    <Grid feed={mainFeedData}/>
                                
                                </InfiniteScroll>
                                :
                                <h1>loading</h1>
                }
        </div>
    )
}

export default FeedGrid