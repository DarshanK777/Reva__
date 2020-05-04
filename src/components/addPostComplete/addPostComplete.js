import React,{useRef, useEffect} from 'react'
import './addPostComplete.css'
import { useDispatch } from 'react-redux'
import {image64toCanvasRef} from '../../utils/imageUtils'
import {base64StringtoFile} from '../../utils/imageUtils'

const CompletePost = (props) =>{

    const refCanvas = useRef(null)
    const dispatch = useDispatch()

    useEffect(()=>{
        const canvasRef = refCanvas.current
        // console.log(canvasRef)
        const {imgSrc, croppedAreaPixels}  = props
        image64toCanvasRef(canvasRef, imgSrc, croppedAreaPixels)
    })

    const handlePost = (event) =>{
        event.preventDefault()
        const canvas = this.refCanvas.current
        const {extension} = this.props
        const filename = "previewFile." + extension
        const croppedImgSrc = canvas.toDataUrl('image/' + filename)

        // original file
        const newCroppedFile = base64StringtoFile(croppedImgSrc, filename)
        //dispatch() // dispatch the upload reducer here
    }   

    return(
        <div className="completepost-flexbox">
            {
                console.log(props.extension)
            }
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
                        <button className="completepost-submit-btn" onClick={handlePost}>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default CompletePost