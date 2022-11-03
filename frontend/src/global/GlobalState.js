import React from 'react';
import GlobalContext from './GlobalContext';
import useShoppingList from '../hooks/useShoppingList';
import useProfile from '../hooks/useProfile';


const GlobalState = (props) => {
	const user = useProfile();
	const shoppingList = useShoppingList();


	return (
		<GlobalContext.Provider value={{ user, shoppingList }}>
			{props.children}
		</GlobalContext.Provider>
	);
};

export default GlobalState;
