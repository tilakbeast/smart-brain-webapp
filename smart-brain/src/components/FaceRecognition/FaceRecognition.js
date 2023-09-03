import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({box, image}) => {
    return (
        <div className= 'center mt2'>
            <div className= 'absolute mt2'>
            <img  id = "inputimage" alt = {"an image"} src = {image} width = {'500px'} height = '_auto_'/>
            <div style = {{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}} className='bounding-box'></div>
            </div>
            
        </div>
    )
}

export default FaceRecognition;