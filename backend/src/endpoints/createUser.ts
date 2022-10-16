import { Request, Response } from 'express';
import { UserDatabase } from '../database/UserDatabase';
import { User } from '../models/User';
import { getAddress } from '../services/getAddress';
import { generateString } from '../services/generateString';


export const createUser = async (req: Request, res: Response) => {
	let errorCode = 400;

	try {
		const {
			name,
			zipcode,
			number,
			complement,
			day,
			email,
			password
		} = req.body;

		if (zipcode.includes('-') || zipcode.length > 8) {
			errorCode = 406;
			throw new Error ("Zipcode must be only numbers.")
		};

		const address = await getAddress(zipcode);

		if (!address) throw new Error('There is something whrong with zipcode information.');

		if (!name || !zipcode || !address.street || !address.neighborhood || !address.city || !address.state || !day || !email || !password) {
			throw new Error("Required fields must be filled.");
		};

		const verifyEmail = await new UserDatabase().getByEmail(email);

		if (verifyEmail.length) {
			errorCode = 409;
			throw new Error('E-mail already registered in database');
		};

		const newUser = new User(
			generateString(),
			name,
			zipcode,
			number ? number : 0,
			address.street,
			complement ? complement : 'N/A',
			address.neighborhood,
			address.city,
			address.state,
			day,
			email,
			password
		);

		await new UserDatabase().setNewObject(newUser);

		res.status(201).send({ newUser: newUser });
	} catch (error: any) {
		res.status(errorCode).send(error.message);
	}
};
