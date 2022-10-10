import styled from "styled-components";

export const Icon = styled.img`
    max-width: 20px;
    max-height: 20px;
`

export const InfoContainer = styled.div`
    width: 85%;
    display: flex;
    flex-direction: row;
    padding: 25px;
    border: solid 1px black;
    justify-content: space-between;
    
`

export const ProfileContainer = styled.div`
    width: 30%;
    padding-left: 15px;
    border-left: solid 1px gray;
    button {
        margin: 2px 2px 0 0;
    }
`