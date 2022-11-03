import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/BASE_URL';
import { useNavigate } from 'react-router-dom';
import { goToHome } from '../../routes/coordinator';
import useForm from '../../hooks/useForm';
import { Header } from '../../components/Header/Header';
import { Container } from '../../components/Container/Container';
import { Footer } from '../../components/Footer/Footer';
import { Form } from './StyledRegisterPage';



const RegisterPage = () => {
	const navigate = useNavigate();

	const { form, onChange, cleanFields } = useForm({
		name: '',
		zipcode: 80000000,
		number: 0,
		complement: '',
		month: 0,
		day: 0,
		email: '',
		password: '',
	});

	const onSubmitRegister = (event) => {
		event.preventDefault();

		const url = `${BASE_URL}/register`;

		axios
			.post(url, form)
			.then((response) => {
				alert('Registration completed!');
				cleanFields();
				console.log(response.data)
				goToHome(navigate);
			})
			.catch((error) => {
				alert(
					'There is missing or conflicting information. Please, try again.'
				);
				console.log(error.response);
				cleanFields();
			});
	};

	return (
		<Container isLogging={true}>

			<Header />

			<Form onSubmit={onSubmitRegister}>
				<h3>Register below!</h3>

				<input
					onChange={onChange}
					required
					name='name'
					placeholder='Name'
					value={form.name}
				/>

				<input
					onChange={onChange}
					required
					name='zipcode'
					placeholder='ZipCode'
					value={form.zipcode}
					type='numeric'
					pattern='^[0-9]*$'
				/>

				<input
					onChange={onChange}
					required
					name='number'
					placeholder='Number'
					value={form.number}
				/>

				<input
					onChange={onChange}
					required
					name='complement'
					placeholder='Complement'
					value={form.complemet}
				/>

				{/* <Dates onChange={onChange} value={form.day} /> */}
				<select	name='day' onChange={onChange} placeholder='Delivery day' value={form.day}>
					<option value=''>Delivery day</option>
					<option value='01'>1</option>
					<option value='02'>2</option>
					<option value='03'>3</option>
					<option value='04'>4</option>
					<option value='05'>5</option>
					<option value='06'>6</option>
					<option value='07'>7</option>
					<option value='08'>8</option>
					<option value='09'>9</option>
					<option value='10'>10</option>
					<option value='11'>11</option>
					<option value='12'>12</option>
					<option value='13'>13</option>
					<option value='14'>14</option>
					<option value='15'>15</option>
					<option value='16'>16</option>
					<option value='17'>17</option>
					<option value='18'>18</option>
					<option value='19'>19</option>
					<option value='20'>20</option>
					<option value='21'>21</option>
					<option value='22'>22</option>
					<option value='23'>23</option>
					<option value='24'>24</option>
					<option value='25'>25</option>
					<option value='26'>26</option>
					<option value='27'>27</option>
					<option value='28'>28</option>
					<option value='29'>29</option>
					<option value='30'>30</option>
					<option value='31'>31</option>
				</select>

				<input
					onChange={onChange}
					required
					name='email'
					placeholder='E-mail'
					value={form.email}
				/>

				<input
					onChange={onChange}
					required
					name='password'
					placeholder='Password'
					value={form.password}
					type='password'
				/>

				<button>Submit</button>
			</Form>

			<button onClick={() => goToHome(navigate)}>Home</button>

			<Footer />

		</Container>
	);
};

export default RegisterPage;