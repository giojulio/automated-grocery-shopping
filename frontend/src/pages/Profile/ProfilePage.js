import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { goToShoppingList } from '../../routes/coordinator';
import { useProtectedPage } from '../../hooks/useProtectedPage';
import GlobalContext from '../../global/GlobalContext';
import { Header } from '../../components/Header/Header';
import { Container } from '../../components/Container/Container';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Footer } from '../../components/Footer/Footer';
import profile from '../../assets/profile.png';
import cart from '../../assets/cart.png';
import edit from '../../assets/edit.png';
import date from '../../assets/date.png';
import {
	HeadersContainer,
	Icon,
	InfoContainer,
	ProductsContainer,
	ProfileContainer,
} from './StyledProfilePage';

const ProfilePage = () => {
	useProtectedPage();
	const navigate = useNavigate();

	const { shoppingList } = useContext(GlobalContext);
	const { user } = useContext(GlobalContext);
	const total = [];

	return (
		<Container>
			<Header haveButton />

			<InfoContainer>
				<div>
					<HeadersContainer>
						<h2>
							<Icon src={cart} alt='shopping cart' />
							&nbsp;Your order:
						</h2>

						<h2>
							<Icon src={date} alt='calendar' />
							&nbsp;Due: {user.delivery_date}th
							<button>
								<Icon src={edit} alt='tilted pencil' />
							</button>
						</h2>
					</HeadersContainer>

					<ProductsContainer>
						{shoppingList ? (
							shoppingList.map((item, index) => {
								const overallPrice =
									item.price * item.desired_qty;

								total.push(overallPrice);

								const getProps = {
									...item,
									isItem: true,
									overallPrice: overallPrice.toFixed(2),
								};

								return (
									<ProductCard props={getProps} key={index} />
								);
							})
						) : (
							<p>No order placed yet.</p>
						)}
					</ProductsContainer>
				</div>

				<ProfileContainer>
					<HeadersContainer>
						<h2>
							<Icon src={profile} alt='silhuette' />
							&nbsp;Profile
						</h2>
					</HeadersContainer>

					<h3>{user.name}</h3>

					<p>{user.email}</p>

					<h4>{user.number}&nbsp;{user.street}</h4>

					<h4>{user.complement}</h4>

					<h4>{user.neighborhood}, {user.city} - {user.state}</h4>

					<h4>{user.zipcode}</h4>

					<button>Edit profile</button>

					<button>Change password</button>

					<br />
					<br />

					<h3>
						Grand Total:&nbsp;$
						{total.reduce((a, b) => a + b, 0).toFixed(2)}
					</h3>

					<button onClick={() => goToShoppingList(navigate)}>
						<h3>Edit Shopping List</h3>
					</button>
				</ProfileContainer>
			</InfoContainer>

			<Footer />
		</Container>
	);
};

export default ProfilePage;