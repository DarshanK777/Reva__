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
import DetailsPage from './components/detailsPage/detailsPage'

const BaseRouter = () =>(
    <Switch>
        <Route exact path='/' component = {Home} />
        <PrivateRoute exact path='/homeFeed' component = {FeedGrid} />
        <PrivateRoute exact path='/profile/:username?' component={UserProfile}/>
        <PrivateRoute exact path='/addPost/' component ={AddPost} />
        <Route exact path='/login/' component ={Login} />
        <Route exact path='/register/' component ={Register} />
        <PrivateRoute exact path='/accounts/' component={EditAccount}/>
        <PrivateRoute exact path='/searchFeed/' component={SearchPage}/>
        <Route exact path='/detailsPage/' component={DetailsPage}/>


    </Switch>   
       
)

export default BaseRouter