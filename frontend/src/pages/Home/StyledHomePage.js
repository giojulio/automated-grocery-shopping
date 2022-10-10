import styled from 'styled-components';

export const OptionsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	width: 100%;
`;

export const Icon = styled.img`
	max-height: 200px;
	width: auto;
`;

export const Option = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 20px;
	padding: 10px;
	background-color: #2eaf7d;
	width: 40%;
	align-items: center;
	img {
		padding-bottom: 25px;
	}
	button {
		width: 90%;
	}
`;

export const Welcome = styled.h2`
	padding: 0px 50px 0px 50px;
	text-align: center;
`;
