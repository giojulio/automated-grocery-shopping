import React from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { useProtectedPage } from '../../hooks/useProtectedPage';

const ProfilePage = () => {
    useProtectedPage();
    
    return (
      <>
      <Header haveButton/>
      <div>orders</div>
      <div>info</div>

      <Footer/>
      </>
    );
};

export default ProfilePage;