import React,{useRef, useEffect} from 'react'
import './addPostComplete.css'
import {image64toCanvasRef} from '../../utils/imageUtils'

const CompletePost = (props) =>{

    const refCanvas = useRef(null)

    useEffect(()=>{
        const canvasRef = refCanvas.current
        console.log(canvasRef)
        const {imgSrc, croppedAreaPixels}  = props
        image64toCanvasRef(canvasRef, imgSrc, croppedAreaPixels)
    })

    return(
        <div className="completepost-flexbox">
            <div className="completepost-container">
               <div className="completepost-img-container">
                 <canvas ref={refCanvas} className="completepost-img" ></ canvas>
               </div>

                <div className="completepost-content">
                        <div className="completepost-caption-title">
                            Caption
                        </div>
                        <textarea maxLength="150" row="2" placeholder="Caption here" className="completepost-caption" />
                    
                    <div className="completepost-btn-container">
                        <button className="completepost-submit-btn">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default CompletePost