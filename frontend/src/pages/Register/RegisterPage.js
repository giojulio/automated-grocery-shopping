import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dates } from '../../components/Dates/Dates';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import useForm from '../../hooks/useForm';
import { goToHome } from '../../routes/coordinator';
import { Form } from './StyledRegisterPage';
import { Container } from '../../components/Container/Container';

const RegisterPage = () => {
	const navigate = useNavigate();

	const { form, setForm, onChange, cleanFields } = useForm({
		name: '',
		zipcode: 80000000,
		number: 0,
		street: '',
		complement: '',
		neighborhood: '',
		city: '',
		state: '',
		month: 0,
		day: 0,
		email: '',
		password: '',
	});

	const checkZipCode = form.zipcode.length === 8;

	useEffect(() => {
		axios
			.get(`https://viacep.com.br/ws/${form.zipcode}/json/`)
			.then((res) => {
				setForm({
					...form,
					street: res.logradouro,
					neighborhood: res.bairro,
					city: res.localidade,
					state: res.uf,
				});
			})
			.catch((err) => {
				console.log(err.response);
			});

	}, [checkZipCode, form, setForm]);

	const onSubmitLogin = (event) => {
		event.preventDefault();

		const url = `api page/endpoint`;

		axios
			.post(url, form)
			.then((response) => {
				alert('Registration completed!');
				cleanFields();
				goToHome(navigate);
			})
			.catch((error) => {
				alert('There is missing or conflicting information. Please, try again.');
				cleanFields();
			});
	};

	return (
		<Container>
			<Header />

			<Form onSubmit={onSubmitLogin}>
        <h3>Register below!</h3>
				<input
					onChange={onChange}
					required
					name='name'
					placeholder='Name'
					value={form.name}
					type='text'
				/>

				<input
					onChange={onChange}
					required
					name='zipcode'
					pattern='/^\d{5}-?\d{3}$/'
					minLength={5}
					maxLength='8'
					placeholder='ZipCode'
					value={form.zipcode}
					type='numeric'
				/>
				
				<input
					onChange={onChange}
					required
					name='number'
					placeholder='Number'
					value={form.number}
					type='numeric'
				/>

				<input
					readOnly
					required
					name='street'
					placeholder='Street'
					value={form.street}
					type='text'
					maxLength={150}
				/>

				<input
					onChange={onChange}
					required
					name='complement'
					placeholder='Complement'
					value={form.complemet}
					type='text'
					maxLength={150}
				/>

				<input
					readOnly
					required
					name='neighborhood'
					placeholder='Neighborhood'
					value={form.neighborhood}
					type='text'
					maxLength={150}
				/>

				<input
					readOnly
					required
					name='city'
					placeholder='City'
					value={form.city}
					type='text'
					maxLength={150}
				/>

				<input
					readOnly
					required
					name='state'
					placeholder='State'
					value={form.state}
					type='text'
					maxLength={150}
				/>

				<Dates props={form} />

				<input
					label='E-mail'
					onChange={onChange}
					required
					name='email'
					placeholder='E-mail'
					value={form.email}
					type='email'
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