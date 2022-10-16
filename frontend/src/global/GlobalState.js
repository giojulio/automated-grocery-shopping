import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/BASE_URL';
import GlobalContext from './GlobalContext';
import useShoppingList from '../hooks/useShoppingList';


const GlobalState = (props) => {
	const [user, setUser] = useState({});
	const shoppingList = useShoppingList();

	useEffect(() => {
		const userId = localStorage.getItem('id');

		axios
			.get(`${BASE_URL}/profile/${userId}`)
			.then((res) => {
				setUser(res.data.user);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);


	return (
		<GlobalContext.Provider value={{ user, setUser, shoppingList }}>
			{props.children}
		</GlobalContext.Provider>
	);
};

export default GlobalState;
