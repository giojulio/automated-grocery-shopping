import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100vh;
	background-color: #c1f6ed;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 67%;
	width: 25%;
	text-align: center;
    margin: 0;
	h3 {
        padding-bottom: 5px;
    }
    button {
        margin-top: 2px;
    }
	
`;