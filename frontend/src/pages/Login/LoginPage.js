import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import useForm from '../../hooks/useForm';
import { goToFeed, goToHome } from '../../routes/coordinator';
import { Form } from './StyledLoginPage';
import { Container } from '../../components/Container/Container';
import { BASE_URL } from '../../constants/BASE_URL';
import GlobalContext from '../../global/GlobalContext';


const LoginPage = () => {
  const navigate = useNavigate();
  const {form, onChange, cleanFields} = useForm({ email:'', password:''})
  const { setUserId } = useContext(GlobalContext)

  const onSubmitLogin = (event) => {
		event.preventDefault()

		const url = `${BASE_URL}/login`;

		axios
			.post(url, form)
			.then((res) => {
				localStorage.setItem('token', res.data.token);
        setUserId(res.data.user_id)
				goToFeed(navigate);
			})
			.catch((error) => {
				alert('E-mail/Password does not match database.');
        console.log(error.response)
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
        <a href='www.google.com'>Forgot your password?</a> {/* If time, create a change password page/endpoints*/}
        <button onClick={() => goToHome(navigate)}>Home</button>

        <Footer/>
      </Container>
    );
};

export default LoginPage;