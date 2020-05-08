import React, { Component, Fragment } from 'react'
import './gridItem.css'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'


class GridItem extends Component{

    state ={
        open : false,
    }

    // handleClick = () =>{
    //         this.setState({
    //             open:true
    //         }) 
    //         // console.log(this.state.open)
    // }

    // modalClose = (data) =>{
    //     this.setState({
    //         open: data
    //     })
    // }

    handleUserLoad = (username) =>{
        this.props.history.push(`/profile/${username}`)
    }

    render(){
        const { data} = this.props
        // console.log(data.image)
        // onClick={() => history.push({pathname:`/det/${data.id}`, data: data})}
        return(
            <Fragment>
                <div className='grid-item' > 
                {/* {
                    this.state.open ? <DetailModal open={this.state.open} close={this.modalClose} data={data} /> : null
                } */}

                {/*  add on hover effect to grid-item */}
                    <img src={data.image} alt="usasd" onClick={()=>{}}  />

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
