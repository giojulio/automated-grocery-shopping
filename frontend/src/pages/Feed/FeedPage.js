import React from 'react';
import { Container } from '../../components/Container/Container';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { useProtectedPage } from '../../hooks/useProtectedPage';

const FeedPage = () => {
    useProtectedPage();
    
    return (
      <Container>
      <Header haveButton/>
      
      <Footer/>
      </Container>
    );
};

export default FeedPage;