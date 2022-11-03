import axios from 'axios';

export const getAddress = async (zipcode: string) => {
    try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${zipcode}/json/`);

        const address = { street: data.logradouro, neighborhood: data.bairro, city: data.localidade, state: data.uf };

        return address
    } catch (error: any) {
        throw new Error(error.message);
    };
};
