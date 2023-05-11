import React from 'react';
import { Dna } from 'react-loader-spinner';
import '../styles.css';

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <Dna
        height={80}
        width={80}
        radius={9}
        color="green"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loader;