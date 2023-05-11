import React from 'react';
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

export default ImageGalleryItem;