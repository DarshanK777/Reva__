import React from 'react'
import './searchPage.css'
import SearchGrid from '../searchGrid/searchGrid'
import SearchInput from '../searchInput/searchInput'
import {searchFeedData} from '../../data/searchFeedData'

class SearchPage extends React.Component{

    state = {
        images: searchFeedData
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
    
    render(){

        const {images} = this.state
        const imageListChunks = this.chunkImages(images)

        return(
            <div className="searchpage-container">
                <SearchInput/>
                <div className="searchgrid-container">
                {   
                    imageListChunks.map((imageItem, index)=>(
                        <SearchGrid imgList={imageItem} key={index}/>
                    ))
                }
                </div>
            </div>
        )
    }
}

export default SearchPage