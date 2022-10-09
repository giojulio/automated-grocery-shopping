import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import useForm from '../../hooks/useForm';
import { goToHome } from '../../routes/coordinator';
import { Container, Form } from './StyledLoginPage';

const LoginPage = () => {
  const navigate = useNavigate();
  const {form, onChange, cleanFields} = useForm({ email:'', password:''})

  const onSubmitLogin = (event) => {
		event.preventDefault()

		const url = `ssss`;

		axios
			.post(url, form)
			.then((response) => {
				localStorage.setItem('token', Math.random());
				navigate('/feed');
			})
			.catch((error) => {
				alert('E-mail/Password does not match database.');
				cleanFields();
			});
	};


    return (
      <Container>
        <Header/>
        
        <Form onSubmit={onSubmitLogin}>
          <input 
            onChange={onChange}
            required
            name='email'
            placeholder='E-mail'
            value={form.email}
            type='email'
          />

          <input onChange={onChange}
            required
            name='password'
            placeholder='Password'
            value={form.password}
            type='password'
          />
          <button>Login</button>
        </Form>

        <button onClick={() => goToHome(navigate)}>Home</button>

        <Footer/>
      </Container>
    );
};

export default LoginPage;