import React from 'react';
import PropTypes from 'prop-types';
const ListImage = ({ uri, image, changeSong }) =>{
    return (
        <div className="list-image-container" onClick={()=>{changeSong(uri)}}>
            <img src={image} alt="track cover"  className="list-image"/>
            <div className="list-image-overlay">PLAY</div>
        </div>
    )
}
ListImage.propTypes = {
    uri: PropTypes.string,
    image: PropTypes.string,
    changeSong: PropTypes.func
}
export default ListImage;