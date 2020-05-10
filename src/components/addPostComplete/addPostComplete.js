import React,{useRef, useEffect} from 'react'
import './addPostComplete.css'
import { useDispatch, useSelector } from 'react-redux'
import { image64toCanvasRef, base64StringtoFile } from '../../utils/imageUtils'
import { postImage } from '../../redux/actions/feed'

const CompletePost = (props, history) =>{

    const refCanvas = useRef(null)
    const refCaption = useRef(null)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(()=>{
        const canvasRef = refCanvas.current
        const {imgSrc, croppedAreaPixels}  = props
        image64toCanvasRef(canvasRef, imgSrc, croppedAreaPixels)
    })

    const handlePost = async (event) =>{
        event.preventDefault()
        const canvasRef = refCanvas.current
        const {extension} = props
        const filename = "previewFile." + extension
        const croppedImgSrc = canvasRef.toDataURL('image/' + filename)

        // cropped file
        const newCroppedFile = base64StringtoFile(croppedImgSrc, filename)
        const caption = refCaption.current.value

        // uploading the post
        const post = await dispatch(postImage(newCroppedFile, caption, user.username))
        
        if(post === 'Success'){
            return props.history.push('/homeFeed')
        } else {
            // show error
        }
    }   

    return(
        <div className="completepost-flexbox">
            <div className="completepost-container">
                <div className="completepost-img-container">
                    <canvas ref={refCanvas} className="completepost-img" ></ canvas>
                </div>
                <div className="completepost-content">
                    {
                        console.log(user)
                    }
                        <div className="completepost-caption-title">
                            Caption
                        </div>
                        <textarea ref={refCaption} maxLength="150" row="2" placeholder="Caption here" className="completepost-caption" />
                    
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