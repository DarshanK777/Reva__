    import React from 'react'
    import {connect} from 'react-redux'
    import {Route, Redirect } from 'react-router-dom'

    const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) =>{
        return(
            <Route {...rest} render={
                (props) => {
                    if(isAuthenticated) { 
                        console.log(isAuthenticated)
                    return <Component {...props}/>
                    }else{
                        console.log(isAuthenticated)
                        return <Redirect to="/login"/>
                    }
                    
                }
            }/>
        )
    }

    const mapStateToProps = state =>{
        return{
            isAuthenticated: state.token !== null
        }
    }

    export default connect(mapStateToProps, null)(PrivateRoute)