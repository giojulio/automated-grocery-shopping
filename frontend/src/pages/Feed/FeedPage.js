import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/BASE_URL';
import { useProtectedPage } from '../../hooks/useProtectedPage';
import { Header } from '../../components/Header/Header';
import { Container } from '../../components/Container/Container';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Footer } from '../../components/Footer/Footer';
import { FeedContainer } from './StyledFeedPage';


const FeedPage = () => {
	useProtectedPage();

	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/products`)
			.then((res) => {
				setProducts(res.data.products);
			})
			.catch((err) => {
				console.log(err.response);
			});
	}, []);

	return (
		<Container>
			<Header haveButton />

			<FeedContainer>

				{products && products.map((item, index) => {
					const getProps = { ...item, isProduct: true };
					return <ProductCard props={getProps} key={index} />;
				})}

			</FeedContainer>

			<Footer />
		</Container>
	);
};

export default FeedPage;