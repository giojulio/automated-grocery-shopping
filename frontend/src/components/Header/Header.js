import React from "react";
import { Container, Logo } from "./StyledHeader";
import { useNavigate } from 'react-router-dom';
import { goToProfile, goToHome, goToShoppingList } from "../../routes/coordinator";
import logo from '../../assets/logo.png'

export const Header = (props) => {
    const navigate = useNavigate() 

    return(
        <Container>
            <div>
                <Logo src={logo} alt="logo shopper"/>
                &nbsp;
                <h1>Shopper.com</h1>
            </div>

            { props.haveButton && 
                <div>
                    <button onClick={() => goToShoppingList(navigate)}>Shopping List</button>

                    <button onClick={() => goToProfile(navigate)}>Profile</button>

                    <button onClick={() => goToHome(navigate)}>Logout</button>
                </div>
            }
        </Container>
    );
};