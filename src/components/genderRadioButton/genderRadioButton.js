import React from 'react'
import './genderRadioButton.css'

const GenderRadioButton = ({gender, selected}) =>{

    const handleChange = (event) =>{
        gender(event.target.value)
    }

    return(
        
            <ul className="radioButtons-container">
                <li>
                <label className="radio-labels">
                    <input
                    type="radio"
                    value="male"
                    checked={selected === "male"}
                    onChange={handleChange}
                    />
                    Male
                </label>
                </li>
                
                <li>
                <label className="radio-labels">
                    <input
                    type="radio"
                    value="female"
                    checked={selected === "female"}
                    onChange={handleChange}
                    />
                    Female
                </label>
                </li>

                <li>
                <label className="radio-labels">
                    <input
                    type="radio"
                    value="other"
                    checked={selected === "other"}
                    onChange={handleChange}
                    />
                    other
                </label>
                </li>
            </ul>
        
    )
}

export default GenderRadioButton