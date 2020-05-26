import React,{useEffect, useState, useRef, useCallback, Fragment} from 'react'
import './feedGrid.css'
import Grid from '../grid/grid'
import {useSelector} from 'react-redux'
import { ClipLoading } from '../loader/loader'
import {getMainFeed, getNextMainFeed} from '../../utils/feedApiCalls'


const FeedGrid = (props) =>{

    const [loading, setLoading ] = useState(true)
    const [feedLoading, setFeedLoading ] = useState(true)
    const [mainFeedData, setMainFeedData ] = useState('')
    const [next, setNext ] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const user = useSelector(state => state.user)

    // scroll code
    const observer = useRef()
    const lastGridItem = useCallback(node=>{
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries =>{
            if(entries[0].isIntersecting && hasMore){
                console.log('visible')
                loadFeed()
            }
        })
        if(node) observer.current.observe(node)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, hasMore])  

    // api call
    const loadFeed = async () =>{
        console.log('inside')
        setLoading(true)
        setTimeout(async ()=>{
            let data
           
            if (next!==false){
                data = await getNextMainFeed(next)
            }
            else{
                // console.log('this')
                data = await getMainFeed()
            }
            setMainFeedData(prevState =>{
                return [
                    ...prevState,
                    ...data.results
                ]
            })
            setNext(
                data.next!==null ? data.next : false
            )
            setHasMore(
                data.next === null ? false : true
            )
            setLoading(false)
            setFeedLoading(false)
        }, 3000)
    }

    // loading the feed on component mount
    useEffect(()=>{
        if(user){
            loadFeed()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className='feedGrid-container'> 

           { feedLoading ? 
                    <div className="feedgridloader">
                        <ClipLoading/>
                    </div> :
                    <Fragment>
                        {
                            console.log(loading)
                        }
                        <Grid {...props} ref={lastGridItem} load={loading} feed={mainFeedData}/>
                    
                    </Fragment>
                
            }
        </div>
    )
}

export default FeedGrid