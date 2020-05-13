import React, { Component, Fragment } from 'react'
import './gridItem.css'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'


class GridItem extends Component{


    handleUserLoad = (username) =>{
        this.props.history.push(`/profile/${username}`)
    }

    handleOnClickItem = (event) =>{
        event.preventDefault()
        console.log(this.props)
        this.props.history.push('/detailsPage/', this.props.data)
    }

    render(){
        const {  data} = this.props
         
        return(
            <Fragment>
                <div className='grid-item' > 
                {/*  add on hover effect to grid-item */}
                    <img src={data.image} alt="usasd" onClick={this.handleOnClickItem} />

                    <div className="grid-item-details">
                       <div className="grid-details-content">
                            <span className="avatar">
                                <img src="/images/icons/circle.svg" alt="usasd" />                            
                            </span>
                            <span className="grid-username" onClick={() => this.handleUserLoad(data.user.username)}>
                                {data.user.username}
                            </span>
                       </div>
                    </div>
                </div>
                
            </Fragment>
        )
    }
}

const mapStateToProps = state =>{
    return{

    }
}

const mapDispatchToProps = dispatch =>{
    return{

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GridItem))
