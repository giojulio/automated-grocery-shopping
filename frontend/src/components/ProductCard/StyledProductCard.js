import styled from "styled-components";

export const Container = styled.div`
    width: 60vw;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin: 10px;
    padding: 10px 5px;
    background-color: rgba(68, 206, 152, .75);
    border-radius: 15px;
    box-shadow: 5px 5px #02353C;
`
export const ProdImg = styled.img`
    max-height: 80px;
    width: auto;
    align-self: center;
    padding-left: 10px;
`

export const CounterInput = styled.input`
    width: 10%;
`

export const ButtonContainer = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-self: center;
    div {
        width: 100%;
        display: flex;
        justify-content: center;
        padding-bottom: 10px;
        button{
            width: 15%;
            justify-self: center;
        };
    };
`
export const InfoContainer =  styled.div`
    width: 50%;
    font-weight: bolder;
`