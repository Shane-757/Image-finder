import React from "react";
import './styles.css'; 
import ImageGallery from "./ImageGallery/ImageGallery";
export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      < ImageGallery />
    </div>
  );
};
