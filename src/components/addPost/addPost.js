import React from 'react'
import './addPost.css'
import Dropzone from 'react-dropzone'
import Cropper from 'react-easy-crop'
import CompletePost from '../addPostComplete/addPostComplete'

// import getCroppedImg from '../../utils/easy-crop-utils/cropImage'
import {extractImageFileExtensionFromBase64} from '../../utils/imageUtils'

const imageMaxSize = 1000000000 // bytes
const acceptedFileTypesArray = ['image/x-png', 'image/png', 'image/jpg', 'image/jpeg']
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'

class AddPost extends React.Component{ 
    
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
      }

    state={
        imgSrc : null,
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect: 4 / 4,
        croppedAreaPixels: null,
        croppedImage: null,
        isCropping: false,
        finalCrop: false,
        open: false
    }

    verifyFile = (files) => {
        if (files && files.length > 0){
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)){
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

    handleOnDrop = (files) => {

        if (files && files.length > 0){
             const isVerified = this.verifyFile(files)
             if (isVerified){
                 // imageBase64Data 
                 const currentFile = files[0]
                 const myFileItemReader = new FileReader()
                 myFileItemReader.addEventListener("load", ()=>{
                     // console.log(myFileItemReader.result)
                     const myResult = myFileItemReader.result
                     this.setState({
                         imgSrc: myResult,
                         extension: extractImageFileExtensionFromBase64(myResult)
                     })
                 }, false)
                 myFileItemReader.readAsDataURL(currentFile)
             }
        }
    }
    
    onCropChange = crop => {
        this.setState({ crop })
    }
    
    onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, 'cropped area pixels', croppedAreaPixels)
        this.setState({
            croppedAreaPixels,
        })
        console.log('canvasRef',this.canvasRef.current)
    }

    onZoomChange = zoom => {
        this.setState({ zoom })
    }
    
    handlePostOnClick = () =>{
        this.setState({
            finalCrop: true
        })
    }

    render(){

        const {imgSrc, extension, croppedAreaPixels} = this.state

        return(
            <div className="addPost-container">
            {
                this.state.imgSrc !== null ? 
                    this.state.finalCrop === true ?
                        <CompletePost imgSrc={imgSrc} extension={extension} croppedAreaPixels={croppedAreaPixels} />
                        :
                        <div className="crop-container">
                            <Cropper
                                image={this.state.imgSrc}
                                crop={this.state.crop}
                                zoom={this.state.zoom}
                                aspect={this.state.aspect}
                                onCropChange={this.onCropChange}
                                onCropComplete={this.onCropComplete}
                                onZoomChange={this.onZoomChange}
                            />
                            <button className="crop-btn" onClick={this.handlePostOnClick}>Post</button>
                        </div>
                :
                <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypes} multiple={false}>
                    {({getRootProps, getInputProps}) => (
                        <section className="dropzone-container">
                            <div {...getRootProps({className: 'dropzone'})}>
                                <input {...getInputProps()} />
                                Drag 'n' drop some files here, or click to select files
                            </div>
                        </section>
                        )}
                </Dropzone>
            }
            </div>  
        )
    }
}

export default AddPost


// to be completed by 20 april


//TODO: Add Dropzone
//TODO: check solution for cropping image
        // or else use react image crop to crop the image\
// final post the image


// page logic



// if (no image url)
//     dropzone
// else    
//     crop
        // if (crop ratio null)
        //         crop
        // else
        //         post

