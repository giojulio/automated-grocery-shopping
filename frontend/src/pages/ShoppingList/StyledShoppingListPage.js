import styled from 'styled-components';

export const Pannel = styled.div`
	display: flex;
	flex-direction: row;
	width: 79vw;
	border: solid 1px black;
	height: 75%;
	box-shadow: inset 0 0 10px rgba(2, 53, 60, 1);
	background: rgba(199, 211, 111, 0.5);
	border-radius: 10px;
	hr {
		border: 1.5px solid green;
		border-radius: 5px;
		margin: 5px;
	}
`;

export const ProductsContainer = styled.div`
	height: 100%;
	overflow-y: scroll;
	width: 81%;
`;

export const NoOrdersP = styled.h1`
	text-align: center;
	padding: 10px;
`;

export const DetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 11px 0;
	justify-content: space-between;
	div {
		button {
			width: 100%;
		};
	};
`;