import React from "react";
import { useNavigate } from "react-router-dom";
import { goToAbout } from "../../routes/coordinator";
import { Container } from "./StyledFooter";


export const Footer = () => {
    const navigate = useNavigate()

    return(
        <Container>
            <button onClick={() => goToAbout(navigate)}>About</button>

            <p>© All Rights Reserved.</p>
           
            <button>Contact Us</button>
        </Container>
    );
};