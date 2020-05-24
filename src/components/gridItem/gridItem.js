import React ,{useState} from 'react'
import './gridItem.css'
import {likeSystemApi} from '../../utils/feedApiCalls'

const GridItem = React.forwardRef((props, ref)=>{

    const handleUserLoad = (username) =>{
        props.history.push(`/profile/${username}`)
    }

    const handleOnClickItem = () =>{
        props.history.push('/detailsPage/', {data :{
            state : props.data,
            likes : likes,
            liked : liked 
        }})
    }

    const handleOnClickLike = async (pk) =>{
        
        const res = await likeSystemApi(pk)
        if(res.liked){
            setLiked(true)
            setLikes(prevState => prevState + 1)
        }else{
            setLiked(false)
            if(likes !== 0){
                setLikes(prevState => prevState - 1)
            }
        }
    }   
    
    const {data} = props
    const [liked, setLiked ] = useState(data.liked)
    const [likes, setLikes] = useState(data.likes)

    return(
        <div ref={ref} className='grid-item' > 
            <img src={data.image} alt="usasd" onClick={() => handleOnClickItem()} />
            <div className="grid-item-details">
               <div className="grid-details-content">
                    <span className="avatar">
                        <img src="/images/01.jpg" alt="usasd" />                            
                    </span>
                    <span className="grid-username" onClick={() => handleUserLoad(data.user.username)}>
                        {data.user.username}
                    </span>
                    
               </div>
               <div className="grid-item-misc">
                        <div className="grid-item-likes">
                           {
                               liked ?
                               <img src="/images/icons/heart-fill.png" onClick={() => handleOnClickLike(data.pk)} alt=""/>:
                               <img src="/images/icons/heart-nofill.png" onClick={() => handleOnClickLike(data.pk)} alt=""/>
                           }
                            <span>
                                {likes}
                            </span>
                        </div>
                        <div className='grid-item-comments'>
                            <img src="/images/icons/comment.png" alt=""/>
                        </div>

                    </div>
            </div>
        </div>
    )
})


export default GridItem