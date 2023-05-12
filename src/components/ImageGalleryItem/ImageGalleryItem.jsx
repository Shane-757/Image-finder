import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css';

const ImageGalleryItem = ({ image, onClick }) => {
  const handleClick = () => {
    onClick(image);
  };

  return (
    <li className="ImageGalleryItem" onClick={handleClick}>
      <img className="ImageGalleryItem-image" src={image.webformatURL} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;