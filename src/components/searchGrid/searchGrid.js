import React, { Fragment } from 'react'
import './searchGrid.css'

const SearchGrid = ({imgList}) =>{

    const checkElement = (value,index) =>{
        if(index === 0 ){
            return <div className="s1"  key={value.id}> <img className="search-grid-img" alt="this" src={value.image}/> </div>
        }else if(index === 9){
            return <div className="s2"  key={value.id}> <img className="search-grid-img" alt="this" src={value.image}/> </div> 
        }
        else{
           return <div className="s3"  key={value.id}> <img className="search-grid-img" alt="this"  src={value.image}/> </div>
        }
    }

    return(
        <Fragment>
            {/* <div className="s1"> <img className="search-grid-img" alt="this" src="/images/01.jpg"/> </div>
            <div className="s3"> <img className="search-grid-img" alt="this" src="/images/01.jpg"/> </div>
            <div className="s3"> <img className="search-grid-img" alt="this" src="/images/01.jpg"/> </div>
            <div className="s3"> <img className="search-grid-img" alt="this" src="/images/01.jpg"/> </div>
            <div className="s3"> <img className="search-grid-img" alt="this" src="/images/01.jpg"/> </div> 
            <div className="s3"> <img className="search-grid-img" alt="this" src="/images/01.jpg"/> </div> 
            <div className="s3"> <img className="search-grid-img" alt="this" src="/images/01.jpg"/> </div>
            <div className="s3"> <img className="search-grid-img" alt="this" src="/images/01.jpg"/> </div>
            <div className="s3"> <img className="search-grid-img" alt="this" src="/images/01.jpg"/> </div>
            <div className="s2"> <img className="search-grid-img" alt="this" src="/images/01.jpg"/> </div>
            
             {
                console.log(imgList)
            } */}

            {
                imgList.map((value, index)=>(
                    checkElement(value, index)
                ))
            }
        </Fragment>
    )
}

export default SearchGrid