import React, { useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { useProtectedPage } from '../../hooks/useProtectedPage';
import { Container } from '../../components/Container/Container';
import profile from '../../assets/profile.png'
import { Icon, InfoContainer, ProfileContainer } from './StyledProfilePage';
import cart from '../../assets/cart.png'

const ProfilePage = () => {
    useProtectedPage();

    const [shoppingOrder, setShoppingOrder] = useState({});

    return (
      <Container>
        <Header haveButton/>
          <InfoContainer>
          <div>
            <h2><Icon src={cart} alt='shopping cart'/>Your order:</h2>

            {shoppingOrder.length ? 
              <div>
                products, quantity, price, date-change date, 
              </div> : <p>No order placed yet.</p>
            }
          </div>

          <ProfileContainer>
            <h3><Icon src={profile} alt='silhuette'/> Profile</h3>
              <p>name</p>
              <p>email</p>
              <p>adress1</p>
              <p>adress2</p>
              <button>Edit profile</button>
              <button>Change password</button>
          </ProfileContainer>
</InfoContainer>
        <Footer/>
      </Container>
    );
};

export default ProfilePage;