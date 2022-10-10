import React from 'react';
import { useProtectedPage } from '../../hooks/useProtectedPage';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Container } from '../../components/Container/Container';


const ShoppingListPage = () => {
    useProtectedPage();
    
    return (
      <Container>
      <Header haveButton/>
      <Footer/>
      </Container>
    );
};

export default ShoppingListPage;