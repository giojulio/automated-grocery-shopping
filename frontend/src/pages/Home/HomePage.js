import React from 'react';
import { useProtectedPage } from '../../hooks/useProtectedPage';

const HomePage = () => {
    useProtectedPage();
    
    return (
      <>
      </>
    );
};

export default HomePage;