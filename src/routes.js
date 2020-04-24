import React from 'react'
import {Route, Switch} from 'react-router-dom'
import FeedGrid from './components/feedGrid/feedGrid'
import UserProfile from './components/userProfile/userProfile'
import AddPost from './components/addPost/addPost'
import Login  from './components/login/login'
import Register  from './components/register/register'
import EditProfile from './components/editProfile/editProfile'




const BaseRouter = () =>(
    <Switch>
        <Route exact path='/' component = {FeedGrid} />
        <Route exact path='/profile/:id' component={UserProfile}/>
        <Route exact path='/addPost/' component ={AddPost} />
        <Route exact path='/login/' component ={Login} />
        <Route exact path='/register/' component ={Register} />
        <Route exact path='/editProfile/:id' component={EditProfile}/>



    </Switch>   
       
)

export default BaseRouter