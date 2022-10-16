import styled from 'styled-components';

export const Icon = styled.img`
	padding-top: 5px;
	width: 20px;
	height: 25%;
`;

export const InfoContainer = styled.div`
	width: 77vw;
	height: 60%;
	display: flex;
	flex-direction: row;
	padding: 25px;
	justify-content: space-between;
	box-shadow: inset 0 0 10px rgba(68, 147, 66, 1);
	background: rgba(2, 53, 60, 0.15);
	border-radius: 10px;
`;
export const HeadersContainer = styled.div`
	width: 55vw;
	display: flex;
	flex-direction: row;
	padding-bottom: 10px;
	align-items: center;
	justify-content: space-between;
	padding-right: 20px;
	button {
		background-color: transparent;
		width: 25px;
		height: 25px;
		img {
			padding-top: 0;
			width: 100%;
			height: 100%;
		};
	};
`;
export const ProfileContainer = styled.div`
	width: 23vw;
	padding-left: 15px;
	border-left: solid 1px gray;
	button {
		margin: 2px 2px 0 0;
	};
`;

export const ProductsContainer = styled.div`
	width: 97%;
	height: 90%;
	overflow-y: scroll;
	box-shadow: inset 0 0 10px rgba(2, 53, 60, 1);
	background: rgba(2, 53, 60, 0.5);
	border-radius: 10px;
	div {
		width: 96%;
	};
	p {
		text-align: center;
	};
`;
