import React from 'react'
import './gridItem.css'

const GridItem = React.forwardRef((props, ref)=>{

    const handleUserLoad = (username) =>{
        props.history.push(`/profile/${username}`)
    }

    const handleOnClickItem = () =>{
        props.history.push('/detailsPage/', props.data)
    }
    
    const {data} = props
    
    return(
        <div ref={ref} className='grid-item' > 
            <img src={data.image} alt="usasd" onClick={() => handleOnClickItem()} />

            <div className="grid-item-details">
               <div className="grid-details-content">
                    <span className="avatar">
                        <img src="/images/icons/circle.svg" alt="usasd" />                            
                    </span>
                    <span className="grid-username" onClick={() => handleUserLoad(data.user.username)}>
                        {data.user.username}
                    </span>
               </div>
            </div>
        </div>
    )
})


export default GridItem