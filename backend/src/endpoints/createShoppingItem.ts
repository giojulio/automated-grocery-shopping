import { Request, Response } from 'express';
import { ProductDatabase } from '../database/ProductDatabase';
import { ShoppingListDatabase } from '../database/ShoppingListDatabase';
import { UserDatabase } from '../database/UserDatabase';
import { ListItem } from '../models/ListItem';
import { TItem } from '../models/types';
import { generateString } from '../services/generateString';


export const createShoppingItem = async (req: Request, res: Response) => {
	let errorCode = 400;

	try {
		const user_id = req.body.user_id;
		const product: TItem = req.body.product;

		if (!product || !user_id) throw new Error('Please inform product ID, user ID and desired quantity.');

		const id = user_id;
		const verifyUser = await new UserDatabase().getById(id);

		if (!verifyUser.length) {
			errorCode = 404;
			throw new Error(`No user was identified.`);
		};

		
		const verifyProduct = await new ProductDatabase().getById(product.id);

		if (!verifyProduct.length) {
			errorCode = 404;
			throw new Error(`No product was identified.`);
		};

		const checkEntry = await new ShoppingListDatabase().getDoubleEntry(user_id, verifyProduct[0].id)
		if (checkEntry.length) {
			errorCode = 409;
			throw new Error(`Double entry. Please direct existing items changes to the specific endpoint.`);
		};

		if (product.desired_qty >= verifyProduct[0].stock_qty) {
			errorCode = 451;
			throw new Error ('Stock cannot handle de quantity desired.')
		};


		
		const listItem = new ListItem(
			generateString(),
			user_id,
			verifyProduct[0].id,
			product.desired_qty
		);


		const stockMath = verifyProduct[0].stock_qty - product.desired_qty;

		await new ShoppingListDatabase().setNewObject(listItem).then(async () => {
			await new ProductDatabase()
				.setNewValue(verifyProduct[0].id, "stock_qty", stockMath);
		});

		
		res.status(201).send('Shopping List order placed.');
	} catch (error: any) {
		res.status(errorCode).send(error.message);
	};
};
