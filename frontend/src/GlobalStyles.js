import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  
    * {
        margin: 0;
        padding: 0;
        letter-spacing: -0.39px;  
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        /* box-sizing: border-box; */
    }

    button {
        padding: 5px;
        border-radius: 10px;
        border: solid 0.5px #449342;
        color: #02353C;
        background-color: #449342;
        font-weight: bolder;
        box-shadow: 1px 1px #02353C;
        :hover, :focus {
            box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
            transform: translateY(-0.25em);
        }
        
    }

    h1, h2, h3, p {
        color: #02353C;
    }

    input, select {
        border-radius: 5px;
        border: solid 0.5px #449342;
        color: #02353C;
        background-color: white;
        font-weight: bolder;
        box-shadow: 1px 1px #02353C;
        padding: 5px;
    }

    // Colors
        --blueishWhite:#C1F6ED;
        --petroleumBlue:#02353C;
        --mossGreen:#449342;
        --acquaGreen:#2EAF7D;
        --lightBlue:#3FD0C9;
`

