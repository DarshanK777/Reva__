import React,{useRef} from 'react'
import './tryModal.css'
import Modal from 'react-modal';
import {image64toCanvasRef} from '../../utils/imageUtils'

Modal.setAppElement('#root')

const TryModal = (props) =>{
    
    const refCanvas = useRef(null)

    const handleCloseModalCB = () =>{
        props.handleCloseModal(false)
    }
    
    const onAfterOpen = () =>{
        const canvasRef = refCanvas.current
        console.log(canvasRef)
        const {imgSrc, croppedAreaPixels}  = props
        image64toCanvasRef(canvasRef, imgSrc, croppedAreaPixels)
    }

    return(
        <Modal isOpen={props.open} onAfterOpen={onAfterOpen} onRequestClose={handleCloseModalCB} shouldCloseOnEsc={true}>
            < canvas ref={refCanvas} style={{width: '20%'}} ></ canvas>
        </Modal>
    )
}

export default TryModal
