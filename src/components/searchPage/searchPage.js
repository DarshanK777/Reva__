import React, { Fragment } from 'react'
import './searchPage.css'
import SearchGrid from '../searchGrid/searchGrid'
import SearchInput from '../searchInput/searchInput'
import {searchFeedData} from '../../data/searchFeedData'
import SearchUserGrid from '../searchUserGrid/searchUserGrid'
import { searchFeedUser, searchFeedNextUser } from '../../utils/feedApiCalls'


class SearchPage extends React.Component{

    constructor(props){
        super(props)
        this.userRef = React.createRef()
    }

    state = {
        images: searchFeedData,
        posts: true,
        loading : false,
        feedLoading : true,
        hasMoreUsers : true,
        nextUsers : false,
        userList: '',

    }
    
    chunkImages(myArray){
        var index = 0;
        var arrayLength = myArray.length; 
        var tempArray = [];
        
        for (index = 0; index < arrayLength; index += 11) {
            var myChunk = myArray.slice(index, index+11)
            tempArray.push(myChunk)
        }
        // console.log(tempArray)
        return tempArray;
    }

    tabSelect = (data) =>{
        this.setState({
            posts: data
        })
    }

    loadFeed = async (value) =>{
        this.setState({
            loading: true,
            value : true
        })
        setTimeout(async ()=>{
            let usersData 

            if(this.state.nextUsers !== false) {
                usersData = await searchFeedNextUser(this.state.nextUsers)
            }
            else{
            usersData = await searchFeedUser(value)
            }
            console.log(usersData)
            this.setState(prevData =>{
                return{
                hasMoreUsers : usersData.next !== null ? true : false,
                nextUsers : usersData.next !== null ?   usersData.next : false,
                userList : [
                    ...prevData.userList,
                    ...usersData.results
                ],
                loading: false 
            }})
        }, 3000)

    }

    scrollFeedUsers = node =>{
        
        if(!node) return
        console.log(node)
        if(this.userRef.current) this.userRef.current.disconnect()
        this.userRef.current = new IntersectionObserver(entries =>{
            if(entries[0].isIntersecting && this.state.hasMoreUsers ){
                console.log('visible')
                this.loadFeed()
            }
        })
        if(node)  this.userRef.current.observe(node)
        console.log(this.userRef.current)
    }


    render(){

        const {images} = this.state
        const imageListChunks = this.chunkImages(images)

        return(
            <div className="searchpage-container">
                {
                console.log(this.userRef.current)
            }
                <SearchInput inputValue={this.loadFeed}  tab={this.tabSelect}/>
                {
                    this.state.posts ?  
                        <div className="searchgrid-container">
                        {   
                            imageListChunks.map((imageItem, index)=>(
                                <SearchGrid imgList={imageItem} key={index}/>
                            ))
                        }
                        </div> :
                        this.state.value ? 
                           this.state.loading ? <h1> loading </h1> : <Fragment>
                                <SearchUserGrid ref={this.scrollFeedUsers} data={this.state.userList} handleClick={this.handleClick} />
                               
                           </Fragment>
                        : 
                        <h1>
                            search to find users
                        </h1>
               }
            </div>
        )
    }
}



export default SearchPage