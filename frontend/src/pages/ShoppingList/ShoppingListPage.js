import React, { useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/BASE_URL';
import { useProtectedPage } from '../../hooks/useProtectedPage';
import GlobalContext from '../../global/GlobalContext';
import { Header } from '../../components/Header/Header';
import { Container } from '../../components/Container/Container';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Footer } from '../../components/Footer/Footer';
import {
	DetailsContainer,
	NoOrdersP,
	Pannel,
	ProductsContainer,
} from './StyledShoppingListPage';

const ShoppingListPage = () => {
	useProtectedPage();
	const { user, shoppingList } = useContext(GlobalContext);
	const total = [];

	const onClickDeleteAll = () => {
		axios
			.delete(`${BASE_URL}/shp-list/${user.id}`)
			.then((res) => {
				alert('List deleted!');
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	return (
		<Container>
			<Header haveButton />

			<Pannel>

				<ProductsContainer>

					{shoppingList ? ( shoppingList && shoppingList.map((item, index) => {
              const overallPrice = item.price * item.desired_qty;

              total.push(overallPrice);

              const getProps = {...item, overallPrice: overallPrice.toFixed(2)};

              return <ProductCard props={getProps} key={index} />;

					  })
					) : (
						<NoOrdersP>No orders placed yet.</NoOrdersP>
					)}

				</ProductsContainer>

				<hr />

				<DetailsContainer>
					{/* <SearchBar/>*/}				
					<h3>
						Grand Total:&nbsp;$
						{total.reduce((a, b) => a + b, 0).toFixed(2)}
					</h3>

					<button onClick={() => onClickDeleteAll()}>
						Delete Shopping List
					</button>
				</DetailsContainer>
			</Pannel>

			<Footer />
		</Container>
	);
};

export default ShoppingListPage;