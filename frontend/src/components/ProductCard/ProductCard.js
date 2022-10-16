import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/BASE_URL';
import picture from '../../assets/feed.png';
import {
	ButtonContainer,
	Container,
	CounterInput,
	InfoContainer,
	ProdImg,
	TotalPriceH4,
} from './StyledProductCard';

export const ProductCard = ({ props }) => {
	const [counter, setCounter] = useState(0);

	// Button functionality
	const onClickCounter = (sign) => {
		if (sign === '-') {
			if (counter === 0) {
				setCounter(0);
			} else {
				setCounter(counter - 1);
			};
		} else if (sign === '+') {
			if (counter === props.stock_qty) {
				alert('You have selected all the stock');
			} else {
				setCounter(counter + 1);
			};
		};
	};

	const onClickAddToList = () => {
		if (counter > 0) {
			const body = {
				user_id: localStorage.getItem('id'),
				product: {
					id: props.id,
					desired_qty: counter,
				},
			};

			axios
				.post(`${BASE_URL}/shp-list`, body)
				.then((res) => {
					alert(res.data);
				})
				.catch((err) => {
					console.log(err.response);
				});
		};
	};

	const onClickAdjust = () => {
		let desired_qty = props.desired_qty + counter;

		if (desired_qty < 0) {
			onClickDeleteItem();
		};

		const body = {
			user_id: localStorage.getItem('id'),
			new_item: {
				id: props.product_id,
				desired_qty,
			},
		};
		
		axios
			.put(`${BASE_URL}/shp-list/edit`, body)
			.then((res) => {
				alert(res.data);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	const onClickDeleteItem = () => {
		axios
			.delete(`${BASE_URL}/shp-list/edit/${props.order_id}`)
			.then((res) => {
				alert(res.data);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	// Conditional rendering
	const showQuantity = () => {
		if (props.isProduct) {

			return (
				<h4>
					<b>Stock: {props.stock_qty}</b>
				</h4>
			);

		} else if (props.isItem) {

			return (
				<h4>
					<b>Selected amount: {props.desired_qty}</b>
				</h4>
			);

		} else {

			return (
				<div>
					<h4>
						<b>Stock: {props.stock_qty}</b>
					</h4>
					<h4>
						<b>Selected amount: {props.desired_qty}</b>
					</h4>
				</div>
			);
		};
	};

	const showButtons = () => {
		if (props.isProduct) {

			return (
				<ButtonContainer>
					<div>
						<button onClick={() => onClickCounter('+')}>
							<b>+</b>
						</button>

						<CounterInput readOnly value={counter} />

						<button onClick={() => onClickCounter('-')}>
							<b>-</b>
						</button>
					</div>

					<button onClick={() => onClickAddToList()}>
						Add to List
					</button>
				</ButtonContainer>
			);

		} else if (props.isItem) {

			return <TotalPriceH4>Total: {props.overallPrice}</TotalPriceH4>;

		} else {
            
			return (
				<ButtonContainer>
					<div>
						<button onClick={() => onClickCounter('+')}>
							<b>+</b>
						</button>

						<CounterInput readOnly value={counter} />

						<button onClick={() => setCounter(counter - 1)}>
							<b>-</b>
						</button>
					</div>
					<div>
						<button onClick={() => onClickAdjust()}>Adjust</button>
						<button onClick={() => onClickDeleteItem()}>
							Delete
						</button>
					</div>

					<br />
					<h4>Total: {props.overallPrice}</h4>
				</ButtonContainer>
			);
		}
	};

	return (
		<Container>
			<ProdImg src={picture} alt='basket of products' />

			<InfoContainer>
				<h3>
					<b>{props.name}</b>
				</h3>

				{showQuantity()}

				<h4>
					<b>Unitary price: ${props.price}</b>
				</h4>
			</InfoContainer>

			{showButtons()}
		</Container>
	);
};
