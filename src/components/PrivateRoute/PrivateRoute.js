import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect } from 'react-router-dom'
// import auth from '../../redux/reducers/auth'

const PrivateRoute = ({component: Component, auth, history, ...rest}) =>{
    return(
        <Route {...rest} render={
            (props) => {
                // console.log(auth)
                if(auth.isLoading){
                    return<h1>Loading</h1>
                }else if(!auth.isAuthenticated){
                    return <Redirect to={{pathname: "/login/", prevLoc: { from : props.location}}}/>
                }else{
                    return <Component {...props} />
                }
                
            }
        }/>
    )
}

const mapStateToProps = (state) =>{
    return{
        auth: state
    }
}


export default connect(mapStateToProps)(PrivateRoute)