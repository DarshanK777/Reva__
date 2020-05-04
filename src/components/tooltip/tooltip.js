import React, { Fragment } from 'react'
import ReactTooltip from "react-tooltip";
import './tooltip.css'

const Tooltip = ({error}) =>{
    return (
        <Fragment>
            {
                error?
                    <div className='tooltip-holder'>
                        <img src="/images/icons/cross.svg"  data-tip data-for='unsuccessfull' alt=""/>
                        <ReactTooltip id='unsuccessfull' type='error'>
                        <span>{error}</span>
                        </ReactTooltip>
                    </div> :
                    <div className='tooltip-holder'>
                        <img src="/images/icons/tick.svg"  data-tip data-for='successfull' alt=""/>
                        <ReactTooltip id='successfull' type='error'>
                        <span>accepted</span>
                        </ReactTooltip>
                    </div>
            }
        </Fragment>
)
}



export default Tooltip