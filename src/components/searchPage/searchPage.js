import React from 'react'
import './searchPage.css'
import SearchGrid from '../searchGrid/searchGrid'
import SearchInput from '../searchInput/searchInput'
import {searchFeedData} from '../../data/searchFeedData'
import SearchUserGrid from '../searchUserGrid/searchUserGrid'
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from 'react-redux'
import {searchFeedUser} from '../../redux/actions/feed'


class SearchPage extends React.Component{

    state = {
        images: searchFeedData,
        posts: true,
        // user: false
    }
    
    chunkImages(myArray){
        var index = 0;
        var arrayLength = myArray.length; 
        var tempArray = [];
        
        for (index = 0; index < arrayLength; index += 11) {
            var myChunk = myArray.slice(index, index+11)
            tempArray.push(myChunk)
        }
    
        return tempArray;
    }

    tabSelect = (data) =>{
        this.setState({
            posts: data
        })
    }
    
    getValue = (value) =>{
        this.props.getUsers(value)
        console.log(this.props.searchUserData)
    }

       
    handleNext = (next) =>{
        if(next !== false){
            // dispatch(loadNextMainFeed(next))
        }    
    }

    render(){

        const {images} = this.state
        const imageListChunks = this.chunkImages(images)

        return(
            <div className="searchpage-container">
                {
                    console.log(this.props)
                }
                <SearchInput inputValue={this.getValue}  tab={this.tabSelect}/>
                {
                    this.state.posts ?  
                        <div className="searchgrid-container">
                        {   
                            imageListChunks.map((imageItem, index)=>(
                                <SearchGrid imgList={imageItem} key={index}/>
                            ))
                        }
                        </div> :
                        this.props.Udata !== "" ? 
                        // need infinite class to style the outer div of the infinte scroll component
                        <div className='infinite'>
                            <InfiniteScroll
                            style={{
                                height: "100%",
                                width: "100%",
                                overflow:"none"
                            }}
                            dataLength={this.props.Ucount}
                            next = {this.handleNext(this.props.Unext)}
                            hasMore={this.props.Unext}
                            loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
                            endMessage={
                            <p style={{ textAlign: "center", bottom: 0 }}>
                                end of users
                            </p>}>
                                <SearchUserGrid data={this.props.Udata} count={this.props.Ucount} next={this.props.Unext} />
                            </InfiniteScroll>
                        </div>
                        : 
                        <h1>
                            search to find users
                        </h1>   
                    

               }
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        Ucount : state.searchUC,
        Unext : state.searchUNext,
        Udata : state.searchUserData
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getUsers : (value) => dispatch(searchFeedUser(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)