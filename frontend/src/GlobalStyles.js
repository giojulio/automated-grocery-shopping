import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  
    * {
        margin: 0;
        padding: 0;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    button {
        padding: 5px;
        border-radius: 10px;
        border: solid 0.5px #02353C;
        color: #9EB23B;
        background-color: #FCF9C6;
        font-weight: bolder;
        box-shadow: 1px 1px #02353C;
        :hover, :focus {
            box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
            transform: translateY(-0.25em);
        };  
    }

    h1, h2, h3, p {
        color: #449342;
        text-shadow: 1px 1px #02353C;
        font-weight: bolder;
    }

    input, select {
        border-radius: 5px;
        border: solid 0.5px #02353C;
        color: #9EB23B;
        background-color: #FCF9C6;
        font-weight: bolder;
        box-shadow: 1px 1px #02353C;
        padding: 5px;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(2, 53, 60, .5);
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: rgba(2, 53, 60, .75);
        border-radius: 10px;
    }
`;