import React from 'react';
import { useProtectedPage } from '../../hooks/useProtectedPage';

const UserPage = () => {
    useProtectedPage();
    
    return (
      <>
      </>
    );
};

export default UserPage;