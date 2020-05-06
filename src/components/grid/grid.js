
import React, { Component } from 'react'
import GridItem from '../gridItem/gridItem'
import './grid.css'
import {list} from '../../data/temporaryData'

class Grid extends Component{

    state={
        list:list
    }

    render(){

        const {feed} = this.props
        console.log(feed)
        
        return(
            <div className="grid-container">
                       {
                           feed.map((value, index) => {
                               return(
                                <GridItem data={value} key={index} />   
                               )
                           })
                       }                    

            </div>
        )
    }
}

export default Grid