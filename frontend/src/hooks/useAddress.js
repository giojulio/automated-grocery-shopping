import axios from 'axios';
import { useState } from 'react';

const useAddress = (zipcode, number, complement) => {
	const [address, setAddress] = useState({
		zipcode: zipcode,
		street: '',
		number: number,
		complement: complement,
		neighborhood: '',
		city: '',
		state: '',
	});

	if (!complement) {
		setAddress({...address, complement: 'N/A'});
	}

	// if (!number) {
	// 	setAddress({...address, number: 0});
	// }

	axios
		.get(`https://viacep.com.br/ws/${zipcode}/json/`)
		.then((res) => {
			setAddress({
				...address,
				street: res.logradouro,
				neighborhood: res.bairro,
				city: res.localidade,
				state: res.uf,
			});
		})
		.catch((err) => {
			console.log(err.response);
		});

	return { address, setAddress };
};

export default useAddress;
