import React from 'react';
import '../styles.css';

const Modal = ({ image, onClose }) => {
  const handleOverlayClick = event => {
    if (event.target.classList.contains('Overlay')) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={image.largeImageURL} alt="" />
        <button className="CloseButton" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;