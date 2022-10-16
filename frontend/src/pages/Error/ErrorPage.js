import React from 'react';
import { useNavigate } from 'react-router-dom';
import { goToHome } from '../../routes/coordinator';
import { Header } from '../../components/Header/Header';
import { Container } from '../../components/Container/Container';
import { ErrorContainer, ErrorSign } from './StyledErrorPage';
import { Footer } from '../../components/Footer/Footer';
import error from '../../assets/error.png';


const ErrorPage = () => {
	const navigate = useNavigate();


	return (
		<Container>
			<Header />

			<ErrorContainer>
				<ErrorSign src={error} alt='warning sign' />

				<h1>ERROR 404</h1>

				<h3>Page not found.</h3>

				<button onClick={() => goToHome(navigate)}>Home</button>
			</ErrorContainer>

			<Footer />
		</Container>
	);
};

export default ErrorPage;