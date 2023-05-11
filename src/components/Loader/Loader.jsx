import React from 'react';
import { Dna } from 'react-loader-spinner';
import '../styles.css';

const Loader = () => {
  return (
    <Dna
      height={80}
      width={80}
      radius={9}
      color="green"
      ariaLabel="loading"
      wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      wrapperClassName="loader-wrapper"
    />
  );
};

export default Loader;