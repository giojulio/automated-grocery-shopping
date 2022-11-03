import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/BASE_URL';


const useProfile = () => {
	const [user, setUser] = useState({});

	useEffect(() => {
		const id = localStorage.getItem('id')
		axios
			.get(`${BASE_URL}/profile/${id}`)
			.then((response) => {
				setUser(response.data.user);
			})
			.catch((error) => {
				console.log(error.response);
			});
	}, []);

	return user;
};

export default useProfile;
