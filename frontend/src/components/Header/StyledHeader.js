import styled from 'styled-components';

export const Container = styled.div`
	width: 100vw;
	height: 15vh;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	background-color: #9EB23B;
	border-bottom: solid 1px #449342;
	font-weight: bolder;
	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		button {
			margin-right: 10px;
		}
	}
`;

export const Logo = styled.img`
	max-height: 90px;
	width: auto;
`;
