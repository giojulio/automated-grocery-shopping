import React from "react";
import { useNavigate } from 'react-router-dom';
import { goToProfile, goToLogout, goToFeed, goToShoppingList } from "../../routes/coordinator";
import logo from '../../assets/logo.png'
import { Container, Logo } from "./StyledHeader";


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
                    <button onClick={() => goToFeed(navigate)}>Feed</button>

                    <button onClick={() => goToShoppingList(navigate)}>Shopping List</button>
                    
                    <button onClick={() => goToProfile(navigate)}>Profile</button>

                    <button onClick={() => goToLogout(navigate)}>Logout</button>
                </div>
            }
        </Container>
    );
};