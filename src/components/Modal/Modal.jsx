import React, { useRef } from 'react';
import '../styles.css';

const Modal = ({ images, selectedImageIndex, setSelectedImageIndex, onClose }) => {
  const modalRef = useRef(null);

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('Overlay')) {
      onClose();
    }
  };

  const handlePrevClick = () => {
    selectedImageIndex > 0 && setSelectedImageIndex(selectedImageIndex - 1);
  };

  const handleNextClick = () => {
    selectedImageIndex < images.length - 1 &&
      setSelectedImageIndex(selectedImageIndex + 1);
  };

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal" ref={modalRef}>
        <button className="ArrowButton LeftArrow" onClick={handlePrevClick} />
        <img src={images[selectedImageIndex].largeImageURL} alt="" />
        <button className="ArrowButton RightArrow" onClick={handleNextClick} />
        <button className="CloseButton" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;