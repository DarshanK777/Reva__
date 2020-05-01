import React from 'react'
import './body.css'
import Header from '../header/header'
import BaseRouter from '../../routes'
import {withRouter} from 'react-router-dom'




const Body = (props) =>{
    
    const RenderHeader = (pathname) =>{
        return (pathname === '/login/' || pathname === '/register/' ?  null : <Header history={props.history}/>)
    }

    return(
        <div className="main-body">
            {
                RenderHeader()
            }
           <div className="content-body">
               <BaseRouter/>
           </div>
        </div>

    )
}

export default withRouter(Body)