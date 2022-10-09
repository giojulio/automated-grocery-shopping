import React from 'react';
import { useProtectedPage } from '../../hooks/useProtectedPage';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import edit from '../../assets/edit.png'
import profile from '../../assets/profile.png'
import { Container, Icon, Option, OptionsContainer, Welcome } from './StyledHomePage';
import { useNavigate } from 'react-router-dom';
import { goToLogin, goToRegister } from '../../routes/coordinator';


const HomePage = () => {
    useProtectedPage();
    const navigate = useNavigate()


    return (
      <Container>
        <Header/>

        <Welcome> Welcome to Shopper.com! An exclusive platform for you to schedule your monthly grocery purchases     where we pair the best of prices and quality. Get ready to change the way you shop!</Welcome>

        <OptionsContainer>
          <Option onClick={() => goToRegister(navigate)}>
            <Icon src={edit} alt='tilted pencil'/>

            <button>Register</button>
          </Option>

          <Option onClick={() => goToLogin(navigate)}>
            <Icon src={profile} alt='person silhuette'/>
          
            <button>Login</button>
          </Option>
          
        </OptionsContainer>

        <p><b>Disclaimer:</b>&nbsp;You can access all Shopper.com features FREE of charge. Free shipping for purchases over $100 only.</p>

        <Footer/>
      </Container>
    );
};

export default HomePage;