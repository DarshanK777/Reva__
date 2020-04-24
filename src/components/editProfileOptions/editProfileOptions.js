import React from 'react'
import './editProfileOptions.css'

class EPOptions extends React.Component{

    state = {
        active : 0 
    }  

    handleOnClick = (index) =>{
        this.setState({
            active: index,
        })

        this.props.selectOption(index)
       
    }

    render(){

        const optionList = ['Edit Profile', 'Change Password', 'Change Email']
 
        return(
            <div className='EPOptions-container'>
                {
                    optionList.map((option, index)=>(
                        <div className={this.state.active === index ? "EPOptions-option active" : "EPOptions-option" }  key={index} onClick={() => this.handleOnClick(index)}>
                            {
                                this.state.active === index ?<div className="option-active"></div> : <div></div>
                            }
                            {option}
                        </div>
                    ))
                }
                
            </div>
        )
    }
}

export default EPOptions