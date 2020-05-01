import React from 'react'
import {Route, Switch} from 'react-router-dom'
import FeedGrid from './components/feedGrid/feedGrid'
import UserProfile from './components/userProfile/userProfile'
import AddPost from './components/addPost/addPost'
import Login  from './components/login/login'
import Register  from './components/register/register'
import EditAccount from './components/editAccount/editAccount'
import SearchPage from './components/searchPage/searchPage'
import Home from './components/home/home'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

const BaseRouter = () =>(
    <Switch>
        <PrivateRoute exact path='/' component = {Home} />
        <Route exact path='/homeFeed' component = {FeedGrid} />
        <Route exact path='/profile/:id' component={UserProfile}/>
        <Route exact path='/addPost/' component ={AddPost} />
        <Route exact path='/login/' component ={Login} />
        <Route exact path='/register/' component ={Register} />
        <Route exact path='/accounts/' component={EditAccount}/>
        <Route exact path='/searchFeed/' component={SearchPage}/>


    </Switch>   
       
)

export default BaseRouter