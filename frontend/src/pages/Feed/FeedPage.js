import React from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { useProtectedPage } from '../../hooks/useProtectedPage';

const FeedPage = () => {
    useProtectedPage();
    
    return (
      <>
      <Header haveButton/>
      
      <Footer/>
      </>
    );
};

export default FeedPage;