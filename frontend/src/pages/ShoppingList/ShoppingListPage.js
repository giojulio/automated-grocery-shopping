import React from 'react';
import { useProtectedPage } from '../../hooks/useProtectedPage';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

const ShoppingListPage = () => {
    useProtectedPage();
    
    return (
      <>
      <Header haveButton/>
      <Footer/>
      </>
    );
};

export default ShoppingListPage;