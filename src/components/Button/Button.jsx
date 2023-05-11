import React from 'react';
import '../styles.css';

const Button = ({ onClick }) => {
  return (
    <button className="Button" onClick={onClick}> 
      Load More
    </button>
  );
};

export default Button;