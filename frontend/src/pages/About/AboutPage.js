import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/Container/Container';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { goToHome } from '../../routes/coordinator';
import { AboutContainer } from './StyledAboutPage';


const AboutPage = () => {
  const navigate = useNavigate();
  
	return (
		<Container>
			<Header />

			<h1>All about us!</h1>

			<AboutContainer>
				<h2>Who are we?</h2>
				<p>
					Shopper.com is a startup company who focuses on providing
					the best customer service when it comes to grocery goods. We
					provide a free platform for you to shop and schelule
					delivery, only charging you shipping fees for purchases
					under $100. Our idea is to make your everyday life easier
					and even more delicious. Our operation is build on great
					developers, excelent product managers and hero delivery
					drivers!
				</p>
				<br />

				<h2>
					How can we claim a better product quality than supermarkets
					with mostly dry products?
				</h2>
				<p>
					Have you ever wondered why that frozen salmon you bought
					doesn't taste quite as nice as a restaurant salmon? Well,
					unfortunately markets and supermarkets usually can't provide
					different refrigeration temperatures for all the fish on
					display. This is where we come in! Through our virtual model
					of marketing products, we are able to further invest in
					quality for you!
				</p>
				<br />

				<h2>How much for a membership?</h2>
				<p>
					THERE'S NO MEMBERSHIP!!! The only fee you may pay for using
					our services is a fixed shipping fee of $14.99 for purchases
					under $100. ENJOY OUR LOWER PRICES!!!
				</p>
			</AboutContainer>

      <button onClick={() => goToHome(navigate)}>Home</button>

			<Footer />
		</Container>
	);
};

export default AboutPage;